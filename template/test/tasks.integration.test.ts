import { describe, test } from "node:test";
import assert from "node:assert";
import { createApp } from "@stratify/core";
import { tasksModule } from "../src/tasks/tasks.module.ts";

describe("tasks routes", () => {
  test("GET /tasks returns initial list", async () => {
    const app = await createApp({ root: tasksModule });
    const res = await app.inject({ method: "GET", url: "/tasks" });
    assert.strictEqual(res.statusCode, 200);
    const json = res.json();
    assert.ok(Array.isArray(json.tasks));
    assert.ok(json.tasks.length >= 1);
    await app.close();
  });

  test("POST /tasks creates a task, then GET /tasks/:id retrieves it", async () => {
    const app = await createApp({ root: tasksModule });

    const createRes = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: { title: "Write tests" }
    });
    assert.strictEqual(createRes.statusCode, 200);
    const created = createRes.json();
    assert.ok(created.id);
    assert.strictEqual(created.title, "Write tests");
    assert.strictEqual(created.done, false);

    const getRes = await app.inject({
      method: "GET",
      url: `/tasks/${created.id}`
    });
    assert.strictEqual(getRes.statusCode, 200);
    const fetched = getRes.json();
    assert.deepStrictEqual(fetched, created);

    await app.close();
  });
});
