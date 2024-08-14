import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Thank you for your purchase! 🎉</h1>

    <p>Your order #{orderId} has been paid. List of items:</p>
    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productVariant.product.name} | {item.productVariant.price} $ x {item.quantity}. ={' '}
          {item.productVariant.price * item.quantity} $
        </li>
      ))}
    </ul>
  </div>
);
