import { FastifyInstance } from "fastify";
import { webhookController } from "../controllers/webhook.controller.js";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhook/payment", webhookController);
}
