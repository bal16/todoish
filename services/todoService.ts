import { db } from "@/lib/db/client";
import { todosTable } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export const getTodos = async () : Promise<Todo[]> => {
  return db.select().from(todosTable).all();
};

export const addTodo = async (text: string) : Promise<Todo> => {
  return db.insert(todosTable).values({ text }).returning().get();
};

export const toggleTodo = async (id: string, isCompleted: boolean) => {
  return db
    .update(todosTable)
    .set({ isCompleted })
    .where(eq(todosTable.id, id))
    .returning()
    .get();
};

export const updateTodo = async (id: string, text: string) : Promise<Todo> => {
  return db
    .update(todosTable)
    .set({ text })
    .where(eq(todosTable.id, id))
    .returning()
    .get();
};

export const getTodosCompletionSummary = async () => {
  const completed = db
    .select({ count: count(todosTable.id) })
    .from(todosTable)
    .where(eq(todosTable.isCompleted, true))
    .all();
  const total = db
    .select({ count: count(todosTable.id) })
    .from(todosTable)
    .all();

  return {
    completedCount: completed[0]?.count || 0,
    totalCount: total[0]?.count || 0,
  };
};

export const deleteTodo = async (id: string) : Promise<Todo | undefined> => {
  return db.delete(todosTable).where(eq(todosTable.id, id)).returning().get();
};

export const clearAllTodos = async () => {
  const deletedTodos = db.delete(todosTable).returning().all();
  return { deletedCount: deletedTodos.length };
};
