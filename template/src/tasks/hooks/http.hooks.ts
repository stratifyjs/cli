import { createHooks } from "@stratify/core";

export const httpHooks = createHooks({
  type: "http",
  name: "http-core", // optional, used by tree printer
  build: async ({ builder }) => {
    // Example: add a simple security header for all responses
    builder.addHook("onRequest", async (_req, reply) => {
      reply.header("x-content-type-options", "nosniff");
    });
    // You can add more lifecycle hooks as needed.
  }
});
