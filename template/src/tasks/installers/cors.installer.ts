import { createInstaller } from "@stratify/core";
import cors from "@fastify/cors";

/**
 * @see https://github.com/fastify/fastify-cors
 */
export const corsInstaller = createInstaller({
  name: "cors", // optional, used by tree printer
  install: async ({ fastify }) => {
    await fastify.register(cors, {
      origin: true, // allow all origins for now
      methods: ["GET", "POST", "PUT", "DELETE"]
    });
  }
});
