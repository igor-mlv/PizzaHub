'use server'
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-temapltes/order-success';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


export async function POST(req: NextRequest) {

  let event;

  if (endpointSecret) {
    // Get the headers object
    const reqHeaders = headers();
    // Get the signature sent by Stripe
    const signature = reqHeaders.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' });
    }

    const payload = await req.text();

    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (err) {
      return NextResponse.json({ error: 'Webhook signature verification failed' });
    }
  }

  switch (event?.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      const orderId = session.metadata?.order_id;
      const order = await prisma.order.findFirst({
        where: {
          id: Number(orderId),
        },
      });

      if (!order) {
        return NextResponse.json({ error: 'Order not found' });
      }

      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: OrderStatus.SUCCEEDED,
          paymentId: session.payment_intent as string,
        },
      });

      const items = JSON.parse(order?.items as string) as CartItemDTO[];

      await sendEmail(
        order.email,
        'Pizza Hub / Your order has been successfully placed 🎉',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );

      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event?.type}.`);
  }

  return NextResponse.json({ received: true });

}
