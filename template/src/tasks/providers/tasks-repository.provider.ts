import { createProvider } from "@stratify/core";

export interface Task {
  id: string;
  title: string;
  done: boolean;
};

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

export const tasksRepository = createProvider({
  name: "tasksRepository",
  expose: async () => {
    // Fake in-memory store
    const store: Task[] = [
      { id: "t1", title: "Read Stratify docs", done: false }
    ];

    return {
      list: async (): Promise<Task[]> => store,
      get: async (id: string): Promise<Task | undefined> =>
        store.find((t) => t.id === id),
      create: async (title: string): Promise<Task> => {
        const task = { id: makeId(), title, done: false };
        store.push(task);
        return task;
      }
    };
  }
});
