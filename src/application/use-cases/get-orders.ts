import { db } from "../../db/index.js";
import { orders } from "../../db/schema.js";

export async function getOrdersUseCase() {
  const result = await db.select().from(orders);

  return result;
}