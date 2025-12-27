import { db } from "./client";
import { todosTable } from "./schema";

type Todo = {
  id?: string;
  text: string;
  completed: boolean;
};

export const seedInitialData = async () => {
  const todos: Todo[] = [
    {
      text: "Sample Todo",
      completed: false,
    },
  ];

  console.info("Seeding the database...");
  try {
    await db.insert(todosTable).values(todos);
  } catch {
    console.error("Failed to seed initial data.");
  } finally {
    console.info("Seeding process completed.");
  }
};
