import type {
  getTodos,
  getTodosCompletionSummary,
} from "@/services/todoService";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ITodosContext {
  todos: Awaited<ReturnType<typeof getTodos>>;
  setTodos: React.Dispatch<
    React.SetStateAction<Awaited<ReturnType<typeof getTodos>>>
  >;
  summary: Awaited<ReturnType<typeof getTodosCompletionSummary>> | undefined;
  setSummary: React.Dispatch<
    React.SetStateAction<
      Awaited<ReturnType<typeof getTodosCompletionSummary>> | undefined
    >
  >;
  //
}

const TodosContext = createContext<ITodosContext | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Awaited<ReturnType<typeof getTodos>>>([]);
  const [summary, setSummary] =
    useState<Awaited<ReturnType<typeof getTodosCompletionSummary>>>();

  return (
    <TodosContext.Provider value={{ todos, setTodos, summary, setSummary }}>
      {children}
    </TodosContext.Provider>
  );
};

const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context || context === undefined) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};

export default useTodos;
