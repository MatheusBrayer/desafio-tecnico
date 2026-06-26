import Fastify from "fastify";
import { ordersRoutes } from "./http/routes/orders";
import { webhookRoutes } from "./http/routes/webhook.js";

const app = Fastify();

app.register(ordersRoutes);

app.register(webhookRoutes);

app.listen({ port: 3000 })
console.log("Server running on http://localhost:3000");
