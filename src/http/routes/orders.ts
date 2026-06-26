import { FastifyInstance } from "fastify";
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
} from "../controllers/orders.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { validateCreateOrder } from "../middlewares/validate-create-order.js";

export async function ordersRoutes(app: FastifyInstance) {
  app.post(
    "/orders",
    {
      preHandler: [authMiddleware, validateCreateOrder],
    },
    createOrderController
  );

  app.get(
    "/orders",
    { preHandler: authMiddleware },
    getOrdersController
  );

  app.get(
    "/orders/:id",
    { preHandler: authMiddleware },
    getOrderByIdController
  );
}