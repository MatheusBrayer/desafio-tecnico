import { FastifyRequest, FastifyReply } from "fastify";
import { createOrderUseCase } from "../../application/use-cases/create-order.js";

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const result = await createOrderUseCase(request.body);

    return reply.send(result);
  } catch (error: any) {
    if (error.message === "Invalid input") {
      return reply.status(400).send({ error: error.message });
    }

    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}
