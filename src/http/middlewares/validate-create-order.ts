import { FastifyRequest, FastifyReply } from "fastify";

export async function validateCreateOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as any;

  const { customer, items, payment_method } = body;

  // valida campos principais
  if (!customer || !items?.length || !payment_method) {
    return reply.status(400).send({
      error: "Missing required fields",
    });
  }

  // valida método de pagamento
  const validMethods = ["card", "pix", "boleto"];

  if (!validMethods.includes(payment_method)) {
    return reply.status(400).send({
      error: "Invalid payment method",
    });
  }

  // valida itens
  for (const item of items) {
    if (
      !item.product ||
      typeof item.quantity !== "number" ||
      typeof item.price !== "number" ||
      item.quantity <= 0 ||
      item.price <= 0
    ) {
      return reply.status(400).send({
        error: "Invalid item data",
      });
    }
  }
}