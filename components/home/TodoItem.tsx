// import { createHomeStyles } from "@/assets/styles/home.styles";
// import useTheme from "@/hooks/useTheme";
// import type { Todo } from "@/services/todoService";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";

// const TodoItem = ({ item, editingId }: { item: Todo; editingId: string }) => {
//   const { colors } = useTheme();
//   const homeStyles = createHomeStyles(colors);

//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState("");

//   useEffect(() => {
//     setIsEditing(item.id === editingId);
//   }, [editingId, item.id]);

//   return (
//     <View style={homeStyles.todoItemWrapper}>
//       <LinearGradient
//         colors={colors.gradients.surface}
//         style={homeStyles.todoItem}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <TouchableOpacity
//           style={homeStyles.checkbox}
//           activeOpacity={0.7}
//           onPress={() => handleToggleTodo(item.id)}
//         >
//           <LinearGradient
//             colors={
//               item.isCompleted
//                 ? colors.gradients.success
//                 : colors.gradients.muted
//             }
//             style={[
//               homeStyles.checkboxInner,
//               {
//                 borderColor: item.isCompleted ? "transparent" : colors.border,
//               },
//             ]}
//           >
//             {item.isCompleted && (
//               <Ionicons name="checkmark" size={18} color="#fff" />
//             )}
//           </LinearGradient>
//         </TouchableOpacity>

//         {isEditing ? (
//           <View style={homeStyles.editContainer}>
//             <TextInput
//               style={homeStyles.editInput}
//               value={editText}
//               onChangeText={setEditText}
//               autoFocus
//               multiline
//               placeholder="Edit your todo..."
//               placeholderTextColor={colors.textMuted}
//             />
//             <View style={homeStyles.editButtons}>
//               <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
//                 <LinearGradient
//                   colors={colors.gradients.success}
//                   style={homeStyles.editButton}
//                 >
//                   <Ionicons name="checkmark" size={16} color="#fff" />
//                   <Text style={homeStyles.editButtonText}>Save</Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
//                 <LinearGradient
//                   colors={colors.gradients.muted}
//                   style={homeStyles.editButton}
//                 >
//                   <Ionicons name="close" size={16} color="#fff" />
//                   <Text style={homeStyles.editButtonText}>Cancel</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ) : (
//           <View style={homeStyles.todoTextContainer}>
//             <Text
//               style={[
//                 homeStyles.todoText,
//                 item.isCompleted && {
//                   textDecorationLine: "line-through",
//                   color: colors.textMuted,
//                   opacity: 0.6,
//                 },
//               ]}
//             >
//               {item.text}
//             </Text>

//             <View style={homeStyles.todoActions}>
//               <TouchableOpacity
//                 onPress={() => handleEditTodo(item)}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={colors.gradients.warning}
//                   style={homeStyles.actionButton}
//                 >
//                   <Ionicons name="pencil" size={14} color="#fff" />
//                 </LinearGradient>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleDeleteTodo(item.id)}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={colors.gradients.danger}
//                   style={homeStyles.actionButton}
//                 >
//                   <Ionicons name="trash" size={14} color="#fff" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </LinearGradient>
//     </View>
//   );
// };

// export default TodoItem;
