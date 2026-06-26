import { db } from "../../db/index.js";
import { orders, orderItems, payments } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export async function getOrderByIdUseCase(orderId: string) {
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!orderResult.length) {
    throw new Error("Order not found");
  }

  const order = orderResult[0];

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  const payment = await db
    .select()
    .from(payments)
    .where(eq(payments.orderId, orderId));

  return {
    ...order,
    items,
    payment: payment[0] || null,
  };
}
