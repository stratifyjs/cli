import { createModule } from "@stratify/core";
import { tasksController } from "./controllers/tasks.controller.js";
import { httpHooks } from "./hooks/http.hooks.js";
import { corsInstaller } from "./installers/cors.installer.js";

export const tasksModule = createModule({
  name: "tasks",
  encapsulate: true,
  controllers: [tasksController],
  hooks: [httpHooks],
  installers: [corsInstaller],
  subModules: []
});
