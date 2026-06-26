import Fastify from "fastify";
import { ordersRoutes } from "./http/routes/orders";

const app = Fastify();

app.get("/health", async () => {
  return { status: "ok" };
});

app.listen({ port: 3000 }).then(() => {
  console.log("Server running on http://localhost:3000");
});

app.register(ordersRoutes);