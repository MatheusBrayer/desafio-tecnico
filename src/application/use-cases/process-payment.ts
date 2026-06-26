import { db } from "../../db/index.js";
import { paymentEvents, orders, payments } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export async function processPaymentWebhook(data: any) {
  const { event_id, order_id, status } = data;


  if (!event_id || !order_id || !status) {
    throw new Error("Invalid input");
  }


  const existingEvent = await db
    .select()
    .from(paymentEvents)
    .where(eq(paymentEvents.eventId, event_id));

  if (existingEvent.length > 0) {
    return { message: "Event already processed" };
  }


  await db.insert(paymentEvents).values({
    eventId: event_id,
    orderId: order_id,
    status,
  });

 
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.id, order_id));

  if (!orderResult.length) {
    throw new Error("Order not found");
  }

  const order = orderResult[0];


  let newStatus = order.status;

  if (status === "approved") {
    newStatus = "paid";
  }

  if (status === "failed" && order.status !== "paid") {
    newStatus = "failed";
  }


  await db
    .update(orders)
    .set({ status: newStatus })
    .where(eq(orders.id, order_id));


  await db
    .update(payments)
    .set({ status: newStatus })
    .where(eq(payments.orderId, order_id));

  return {
    message: "Webhook processed",
  };
}
