import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import useTodos from "@/hooks/useTodos";
import {
  deleteTodo,
  toggleTodo,
  updateTodo,
  type Todo,
} from "@/services/todoService";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const TodoItem = ({ item }: { item: Todo }) => {
  const { colors, isDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const { todos } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo(id, !todos.find((todo) => todo.id === id)?.isCompleted);
    } catch (error) {
      console.error("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo", [], {
        userInterfaceStyle: isDarkMode ? "dark" : "light",
      });
    }
  };

  const handleSaveEdit = async () => {
    if (editText.trim()) {
      try {
        await updateTodo(item.id, editText.trim());
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating todo", error);
        Alert.alert("Error", "Failed to update todo", [], {
          userInterfaceStyle: isDarkMode ? "dark" : "light",
        });
      }
    }
  };

  const handleDeleteTodo = async () => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTodo(item.id),
        },
      ],
      {
        userInterfaceStyle: isDarkMode ? "dark" : "light",
      }
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(item.text);
  };

  return (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(item.id)}
        >
          <LinearGradient
            colors={
              item.isCompleted
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              homeStyles.checkboxInner,
              {
                borderColor: item.isCompleted ? "transparent" : colors.border,
              },
            ]}
          >
            {item.isCompleted && (
              <Ionicons name="checkmark" size={18} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        {isEditing ? (
          <View style={homeStyles.editContainer}>
            <TextInput
              style={homeStyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
              placeholder="Edit your todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButtons}>
              <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.success}
                  style={homeStyles.editButton}
                >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.muted}
                  style={homeStyles.editButton}
                >
                  <Ionicons name="close" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity
                onPress={() => {
                  setEditText(item.text);
                  setIsEditing(true);
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteTodo} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
