import { ThemeProvider } from "@/hooks/useTheme";
import { TodosProvider } from "@/hooks/useTodos";
// import useInit from "@/lib/db/use-init";
import { Stack } from "expo-router";

export default function RootLayout() {
  // useInit();
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
