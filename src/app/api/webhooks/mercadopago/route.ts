import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: { timeout: 5000 }
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-signature');
    const xRequestId = req.headers.get('x-request-id');
    const url = new URL(req.url);
    const dataId = url.searchParams.get('data.id');
    const type = url.searchParams.get('type');
    
    // MP Webhooks pueden llegar por body (JSON) o Query Params
    const bodyText = await req.text();
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch {
      body = {};
    }

    const action = body.action || type;
    const paymentId = body.data?.id || dataId;

    if (!paymentId || (action !== 'payment.created' && action !== 'payment.updated')) {
      return NextResponse.json({ received: true });
    }

    // 1. Verificación de Firma (Opcional pero recomendada por seguridad)
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (signature && secret) {
      const parts = signature.split(',');
      let ts = '';
      let hash = '';
      
      parts.forEach(part => {
        const [key, value] = part.split('=');
        if (key === 'ts') ts = value;
        if (key === 'v1') hash = value;
      });

      const manifest = `id:${paymentId};request-id:${xRequestId};ts:${ts};`;
      const hmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
      
      if (hmac !== hash) {
        console.error("Firma de Mercado Pago inválida");
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // 2. Consultar a la API de Mercado Pago para verificar la autenticidad del pago
    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

    if (!payment || !payment.external_reference) {
      return NextResponse.json({ error: 'Payment not found or external_reference missing' }, { status: 400 });
    }

    const orderId = payment.external_reference;

    // 3. Actualizar la base de datos según el estado
    if (payment.status === 'approved') {
      await prisma.$transaction(async (tx) => {
        // Actualizar Order
        const order = await tx.order.update({
          where: { id: orderId },
          data: { status: 'PAGADO' },
        });

        // Actualizar Payment
        await tx.payment.updateMany({
          where: { orderId: orderId },
          data: { 
            status: 'COMPLETED',
            transactionId: payment.id?.toString() || paymentId.toString()
          }
        });
      });
      
      console.log(`Orden ${orderId} pagada exitosamente vía Mercado Pago.`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error procesando webhook de Mercado Pago:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
