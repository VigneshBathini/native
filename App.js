// Todo List with Edit + Delete

// Focus: useState + array operations + controlled input + validation + conditional rendering.

// Problem

// Build a Todo app with:

// Todo:
// [ Enter todo................ ] [Add]

// --------------------------------

// ☐ Learn React Native       [Edit] [Delete]
// ☑ Practice JavaScript      [Edit] [Delete]
// ☐ Learn React Query        [Edit] [Delete]

// --------------------------------

// Total: 3
// Completed: 1
// Pending: 2
// Requirements
// Add a todo
// Don't allow empty todos
// Mark todo completed/uncompleted
// Delete todo
// Edit todo
// Show total count
// Show completed count
// Show pending count
// Show "No todos" when empty
// Initial data
// const INITIAL_TODOS = [
//   { id: 1, title: "Learn React Native", completed: false },
//   { id: 2, title: "Practice JavaScript", completed: true },
//   { id: 3, title: "Learn React Query", completed: false },
// ];
// Important constraint

// Don't maintain:

// const [completedCount, setCompletedCount] = useState(0);
// const [pendingCount, setPendingCount] = useState(0);

// Those values are derived from the todos.

// Think:

// todos
//  ├── total
//  ├── completed
//  └── pending

// You can calculate them from the same state.

// Start with
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   FlatList,
//   StyleSheet,
// } from "react-native";

// import { useState } from "react";

// export default function TodoApp() {
//   // your code
// }