import { db } from "../../db/index.js";
import { orders, orderItems, payments } from "../../db/schema.js";

export async function createOrderUseCase(data: any) {
  const { customer, items, payment_method } = data;

  if (!customer || !items?.length || !payment_method) {
    throw new Error("Invalid input");
  }

  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;
  }

  const status = payment_method === "card" ? "paid" : "awaiting_payment";

  const orderResult = await db
    .insert(orders)
    .values({
      customer,
      total,
      status,
    })
    .returning();

  const order = orderResult[0];

  for (const item of items) {
    await db.insert(orderItems).values({
      orderId: order.id,
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    });
  }

  const paymentResult = await db
    .insert(payments)
    .values({
      orderId: order.id,
      method: payment_method,
      status,
    })
    .returning();

  const payment = paymentResult[0];

  let paymentData: any = {
    method: payment.method,
  };

  if (payment.method === "pix") {
    paymentData.pix_code = "fake_pix_" + Date.now();
  }

  if (payment.method === "boleto") {
    paymentData.boleto_code = "fake_boleto_" + Date.now();
  }

  return {
    id: order.id,
    status: order.status,
    total: order.total,
    payment: paymentData,
  };
}
