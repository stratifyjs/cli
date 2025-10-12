import { createController } from "@stratify/core";
import { Type } from "@sinclair/typebox";
import { tasksRepository } from "../providers/tasks-repository.provider.js";

export const tasksController = createController({
  name: "tasks", // optional, used by tree printer
  deps: { tasksRepository },
  build: async ({ builder, deps }) => {
    // GET /tasks
    builder.addRoute({
      method: "GET",
      url: "/tasks",
      handler: async () => {
        return { tasks: await deps.tasksRepository.list() };
      }
    });

    // GET /tasks/:id
    builder.addRoute({
      method: "GET",
      url: "/tasks/:id",
      schema: {
        params: Type.Object({ id: Type.String() })
      },
      handler: async (req, reply) => {
        const task = await deps.tasksRepository.get(req.params.id);
        if (!task) {
          return reply.code(404).send({ error: "Not Found" });
        }
        return task;
      }
    });

    // POST /tasks
    builder.addRoute({
      method: "POST",
      url: "/tasks",
      schema: {
        body: Type.Object({
          title: Type.String({ minLength: 1 })
        })
      },
      handler: async (req) => {
        const { title } = req.body;
        const created = await deps.tasksRepository.create(title);
        return created;
      }
    });
  }
});
