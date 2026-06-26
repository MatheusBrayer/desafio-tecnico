import { FastifyRequest, FastifyReply } from "fastify";

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
    try {
        const body = request.body as any;
        const { customer , items , payment_mothod } = body;

        let total = 0;

        for (const item of items) {
        total += item.price * item.quantity;
        }  

        return reply.send({ total });
    } catch (error) {
        return reply.status(500).send({ error: "Internal server error" })
    }
}