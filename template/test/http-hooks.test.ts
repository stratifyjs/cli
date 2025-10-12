import { describe, test } from "node:test";
import assert from "node:assert";
import { createApp } from "@stratify/core";
import { tasksModule } from "../src/tasks/tasks.module.js";

describe("http hooks", () => {
  test("sets x-fastify-version header on all responses", async () => {
    const app = await createApp({ root: tasksModule });

    const res = await app.inject({ method: "GET", url: "/tasks" });
    assert.strictEqual(res.statusCode, 200);

    const versionHeader = res.headers["x-fastify-version"];
    assert.ok(versionHeader, "x-fastify-version header should be set");

    assert.strictEqual(versionHeader, app.version);

    await app.close();
  });
});
