import { getTodos } from "@/lib/services/todoService";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [todos, setTodos] = useState<Awaited<ReturnType<typeof getTodos>>>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Todo Lists</Text>
      {todos.map((todo) => (
        <Text key={todo.id}>{todo.text}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
