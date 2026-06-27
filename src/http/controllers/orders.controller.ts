import { FastifyRequest, FastifyReply } from "fastify";
import { createOrderUseCase } from "../../application/use-cases/create-order.js";
import { getOrdersUseCase } from "../../application/use-cases/get-orders.js";
import { getOrderByIdUseCase } from "../../application/use-cases/get-order-by-id.js";

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const result = await createOrderUseCase(request.body);

    return reply.send(result);
  } catch (error: any) {
    console.log("ERRO AQUI 👉", error); // 👈 adiciona isso

    if (error.message === "Invalid input") {
      return reply.status(400).send({ error: error.message });
    }

    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}

export async function getOrdersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await getOrdersUseCase();
  return reply.send(result);
}

export async function getOrderByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as {id: string};

    const result = await getOrderByIdUseCase(id);

    return reply.send(result);
  } catch (error: any) {
    return reply.status(404).send({ error: error.message });
  }
}

