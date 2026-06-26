import { FastifyInstance } from "fastify";
import { createOrderController } from "../controller/orders.controller";

export async function ordersRoutes(app: FastifyInstance) {
  app.post("/orders", createOrderController);
}