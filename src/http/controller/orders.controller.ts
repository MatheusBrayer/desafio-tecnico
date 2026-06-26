import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../db/index.js";
import { orders, orderItems } from "../../db/schema.js";

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = request.body as any;
    const { customer, items, payment_method } = body;

    let total = 0;

    for (const item of items) {
      total += item.price * item.quantity;
    }

    let status = payment_method === "card"
    ? "paid"
    : "awaiting_payment";

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

    return reply.send({
      id: order.id,
      total: order.total,
    });
    
  } catch (error) {
    return reply.status(500).send({ error: "Internal server error" });
  }
}
