import migrations from "@/drizzle/migrations";
import { ThemeProvider } from "@/hooks/useTheme";
import { TodosProvider } from "@/hooks/useTodos";
import { db } from "@/lib/db/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
// import useInit from "@/lib/db/use-init";
import { Stack } from "expo-router";

export default function RootLayout() {
  // useInit();
  useMigrations(db, migrations);
  return (
    <ThemeProvider>
      <TodosProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TodosProvider>
    </ThemeProvider>
  );
}
