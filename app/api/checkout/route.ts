import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const corpo = await request.json();
    
    const { 
      nome, email, telefone, tipoLivro, valorTotal,
      cep, rua, numero, complemento, bairro, cidade, estado 
    } = corpo;

    // 1. Cria ou busca o cliente baseado no e-mail (evita duplicar o cliente se ele comprar de novo)
    const cliente = await prisma.cliente.upsert({
      where: { email },
      update: { nome, telefone },
      create: { nome, email, telefone },
    });

    // 2. Se for livro físico, salva o endereço atrelado a esse cliente
    if (tipoLivro === 'fisico') {
      await prisma.endereco.create({
        data: {
          clienteId: cliente.id,
          cep,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
        },
      });
    }

    // 3. Registra o pedido como "pendente" no banco de dados
    const pedido = await prisma.pedido.create({
      data: {
        clienteId: cliente.id,
        tipoLivro,
        valorTotal,
        statusPagamento: 'pendente',
        statusEnvio: tipoLivro === 'ebook' ? 'nao_aplicavel' : 'nao_aplicavel', 
      },
    });

    // 4. Criar preferência no Mercado Pago
    try {
      const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

      if (!MP_ACCESS_TOKEN) {
        console.warn('MERCADO_PAGO_ACCESS_TOKEN não definido — retornando apenas pedido salvo.');
        return NextResponse.json({ success: true, pedidoId: pedido.id }, { status: 201 });
      }

      const mpBody = {
        items: [
          {
            id: String(pedido.id),
            title: tipoLivro === 'ebook' ? 'E-book - Guia Regenerar' : 'Livro Físico - Guia Regenerar',
            unit_price: Number(valorTotal),
            quantity: 1,
          },
        ],
        payer: {
          name: nome,
          email: email,
        },
        external_reference: String(pedido.id),
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
      };

      const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(mpBody),
      });

      if (!mpRes.ok) {
        const txt = await mpRes.text();
        console.error('Erro criando preferência MP:', mpRes.status, txt);
        return NextResponse.json({ success: true, pedidoId: pedido.id }, { status: 201 });
      }

      const pref = await mpRes.json();

      // Retorna a URL de checkout para o frontend redirecionar
      return NextResponse.json({ success: true, pedidoId: pedido.id, preferenceUrl: pref.init_point }, { status: 201 });

    } catch (mpError) {
      console.error('Erro na integração com Mercado Pago:', mpError);
      return NextResponse.json({ success: true, pedidoId: pedido.id }, { status: 201 });
    }

  } catch (error: any) {
    console.error('Erro no Checkout API:', error);
    return NextResponse.json({ error: 'Erro interno ao salvar o pedido.' }, { status: 500 });
  }
}