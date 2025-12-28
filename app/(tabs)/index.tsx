import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/home/EmptyState";
import Header from "@/components/home/Header";
import LoadingSpinner from "@/components/home/LoadingSpinner";
import TodoInput from "@/components/home/TodoInput";
import TodoItem from "@/components/home/TodoItem";
import useTheme from "@/hooks/useTheme";
import useTodos from "@/hooks/useTodos";
import { getTodos } from "@/services/todoService";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const { todos, setTodos } = useTodos();
  const [isLoading, setIsLoading] = useState(true);

  const homeStyles = createHomeStyles(colors);

  useEffect(() => {
    getTodos().then((fetchedTodos) => {
      setTodos(fetchedTodos);
      setIsLoading(false);
    });
  }, [todos, setTodos, isLoading]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={({ item }) => <TodoItem item={item} />}
          keyExtractor={(item) => item.id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
