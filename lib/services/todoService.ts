import { db } from "@/lib/db/client";
import { todosTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const getTodos = async () => {
  return db.select().from(todosTable).all();
};

export const addTodo = async (text: string) => {
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

export const editTodo = async (id: string, text: string) => {
  return db
    .update(todosTable)
    .set({ text })
    .where(eq(todosTable.id, id))
    .returning()
    .get();
};

export const deleteTodo = async (id: string) => {
  return db.delete(todosTable).where(eq(todosTable.id, id)).returning().get();
};
