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

    // const generatedPrice = await stripe.prices.create({
    //     currency: 'usd',
    //     unit_amount: details.amount * 100, // Amount in cents (e.g., $10.00 is 1000)
    //     product_data: {
    //         name: details.description,
    //     },
    // });

    // try {
    //     const paymentLink = await stripe.paymentLinks.create({
    //         line_items: [
    //             {
    //                 price: generatedPrice.id,
    //                 quantity: 1,
    //             },
    //         ],
    //         after_completion: {
    //             redirect: {
    //                 url: process.env.NEXT_PUBLIC_BASE_URL as string,
    //             },
    //             type: 'redirect'
    //         },
    //         metadata: {
    //             order_id: details.orderId
    //         }


    //     });

    //     return paymentLink;
    // } catch (error) {
    //     console.error('Error creating payment link:', error);
    //     throw error;
    // }

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
            success_url: process.env.NEXT_PUBLIC_BASE_URL,
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