import { ThemeProvider } from "@/hooks/useTheme";
import { db } from "@/lib/db/client";
import migrations from "@/lib/db/drizzle/migrations";
import { todosTable } from "@/lib/db/schema";
import { seedInitialData } from "@/lib/db/seed";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
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

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
