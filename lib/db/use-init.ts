import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect } from "react";
import { db } from "./client";
import { todosTable } from "./schema";
import { seedInitialData } from "./seed";

export default function useInit() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.info(`Migration error: ${error.message}`);
  }

  useEffect(() => {
    if (!success) {
      console.info("Migration is in progress...");
      return;
    }
    (async () => {
      await db.delete(todosTable);
      await seedInitialData();
    })();
    console.info("Migration successful!");
  }, [success]);
}
