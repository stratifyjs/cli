import { createAdapter } from "@stratify/core";

/**
 * Exposes Fastify version for the current instance context.
 */
export const versionAdapter = createAdapter({
  name: "version",
  expose: ({ fastify }) => ({
    version: fastify.version
  })
});
