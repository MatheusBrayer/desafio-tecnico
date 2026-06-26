import { FastifyInstance } from "fastify";
import { createOrderController } from "../controllers/orders.controller";

export async function ordersRoutes(app: FastifyInstance) {
  app.post("/orders", createOrderController);
}