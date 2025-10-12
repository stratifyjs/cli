import { createHooks } from "@stratify/core";
import { versionAdapter } from "../adapters/version.adapter";

export const httpHooks = createHooks({
  type: "http",
  name: "http-core",
  adaps: { version: versionAdapter },
  build: async ({ builder, adaps }) => {
    // Adds headers to every request
    builder.addHook("onSend", async (_req, reply, payload) => {
      reply.header("x-fastify-version", adaps.version);
      return payload;
    });
  },
});
