import { createId } from "@paralleldrive/cuid2";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", (t) => ({
  id: t
    .text("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()), //cuid / string
  text: t.text("text").notNull(), //string
  isCompleted: t
    .integer("isCompleted", { mode: "boolean" })
    .notNull()
    .$default(() => false), //boolean
}));
