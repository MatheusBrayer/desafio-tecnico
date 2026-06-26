import { FastifyRequest, FastifyReply } from "fastify";
import { processPaymentWebhook } from "../../application/use-cases/process-payment.js";

export async function webhookController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await processPaymentWebhook(request.body);
    return reply.send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
  }
}