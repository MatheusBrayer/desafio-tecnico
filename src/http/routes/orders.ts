import { FastifyInstance } from "fastify";
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
} from "../controllers/orders.controller.js";

export async function ordersRoutes(app: FastifyInstance) {
  app.post("/orders", createOrderController);
  app.get("/orders", getOrdersController);
  app.get("/orders/:id", getOrderByIdController);
}
