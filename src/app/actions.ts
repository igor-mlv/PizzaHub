'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components';
import { VerificationUserTemplate } from '@/shared/components/shared/email-temapltes/verification-user';
import { CheckoutFormValues } from '@/shared/constans';
import { createPaymentLink, sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Find the cart by token */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* If the cart is not found, return an error */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* If the cart is empty, return an error */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const HST = 13;
    const DELIVERY_PRICE = 15;

    const hstPrice = (userCart.totalAmount * HST) / 100;

    const amountAfterTaxAndDeleviry = userCart.totalAmount + DELIVERY_PRICE + hstPrice;

    /* Create order */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: Number(amountAfterTaxAndDeleviry.toFixed(2)),
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Clean user cart */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPaymentLink({
      amount: Number(amountAfterTaxAndDeleviry.toFixed(2)),
      orderId: order.id,
      description: 'Order Payment #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    const paymentUrl = paymentData.url || '';

    await sendEmail(
      data.email,
      'Pizza Hub / Pay for Order #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Email not confirmed');
      }

      throw new Error('User already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Registration Confirmation',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
