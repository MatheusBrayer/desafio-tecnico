import { FastifyRequest, FastifyReply } from "fastify";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== "secret-token") {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}