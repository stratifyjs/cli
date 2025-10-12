import { createApp } from "@stratify/core";
import closeWithGrace from "close-with-grace";

import { tasksModule } from "./tasks/tasks.module.js";

const app = await createApp({
  root: tasksModule,
  serverOptions: {
    logger: true,
  },
});

closeWithGrace({ delay: 500 }, async ({ err }) => {
  if (err != null) {
    app.log.error(err);
  }

  await app.close();
});

try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
