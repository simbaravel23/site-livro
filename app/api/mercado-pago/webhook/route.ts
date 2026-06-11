import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Do not instantiate PrismaClient at module scope to avoid runtime initialization during build
export async function POST(request: Request) {
  try {
    const url = new URL(request.url);

    // Mercado Pago pode enviar o id no corpo ou como query param
    const body = await request.json().catch(() => ({}));
    let paymentId: string | undefined;

    if (body?.data && body.data.id) paymentId = String(body.data.id);
    if (!paymentId && body?.id) paymentId = String(body.id);
    if (!paymentId) paymentId = url.searchParams.get('id') || url.searchParams.get('payment_id') || undefined;

    if (!paymentId) {
      console.warn('Webhook recebido sem payment id', { body });
      return NextResponse.json({ ok: false, message: 'payment id not provided' }, { status: 400 });
    }

    const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;
    if (!MP_ACCESS_TOKEN) {
      console.error('MERCADO_PAGO_ACCESS_TOKEN não configurado');
      return NextResponse.json({ ok: false, message: 'MP token not configured' }, { status: 500 });
    }

    // Buscar o pagamento direto na API do Mercado Pago para confirmar o status e obter external_reference
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });

    if (!mpRes.ok) {
      const txt = await mpRes.text();
      console.error('Erro buscando pagamento MP:', mpRes.status, txt);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    const payment = await mpRes.json();

    // payment.status exemplo: approved, pending, in_process, rejected, cancelled
    const statusMap: Record<string, string> = {
      approved: 'aprovado',
      pending: 'pendente',
      in_process: 'pendente',
      rejected: 'recusado',
      cancelled: 'recusado',
    };

    const novoStatus = statusMap[payment.status] || 'pendente';

    const externalRef = payment.external_reference || payment.additional_info?.items?.[0]?.external_reference;
    if (!externalRef) {
      console.warn('Pagamento sem external_reference:', payment);
      return NextResponse.json({ ok: false, message: 'external_reference not found' }, { status: 400 });
    }

    const pedidoId = parseInt(String(externalRef), 10);
    if (Number.isNaN(pedidoId)) {
      console.warn('external_reference não é um id válido:', externalRef);
      return NextResponse.json({ ok: false, message: 'invalid external_reference' }, { status: 400 });
    }

    // Atualiza o pedido no banco
    const prisma = new PrismaClient();
    try {
      await prisma.pedido.update({
        where: { id: pedidoId },
        data: { statusPagamento: novoStatus },
      });

      console.log(`Pedido ${pedidoId} atualizado para statusPagamento=${novoStatus}`);

      return NextResponse.json({ ok: true });
    } finally {
      await prisma.$disconnect();
    }
  } catch (err) {
    console.error('Erro no webhook Mercado Pago:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Opcional: Mercado Pago pode enviar GET com query params em alguns modos — apenas logamos e retornamos 200
  const url = new URL(request.url);
  console.log('GET webhook recebido:', Object.fromEntries(url.searchParams.entries()));
  return NextResponse.json({ ok: true });
}
