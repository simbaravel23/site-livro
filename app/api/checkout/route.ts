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

    // Retorna o sucesso para o frontend
    return NextResponse.json({ success: true, pedidoId: pedido.id }, { status: 201 });

  } catch (error: any) {
    console.error('Erro no Checkout API:', error);
    return NextResponse.json({ error: 'Erro interno ao salvar o pedido.' }, { status: 500 });
  }
}