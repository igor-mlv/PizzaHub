import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
});

interface Props {
    description: string;
    amount: number;
    orderId: number
}

export async function createPaymentLink(details: Props) {

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: details.description,
                        },
                        unit_amount: details.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?paid`,
            metadata: {
                order_id: String(details.orderId),
            },
        });

        console.log("-----------------------------");
        console.log(session.metadata?.order_id);

        return session;

    } catch (error) {
        console.error('Error creating payment link:', error);
        throw error;
    }
}