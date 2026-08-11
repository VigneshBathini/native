import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    // Prevent empty todos
    if (!todo.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: todo.trim(),
    };

    setTodos((prev) => [...prev, newTodo]);

    // Clear input
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      <TextInput
        placeholder="Enter Todo"
        value={todo}
        onChangeText={setTodo}
        style={styles.input}
      />

      <Pressable style={styles.addButton} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </Pressable>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Todos</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.title}</Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  todoText: {
    fontSize: 16,
    flex: 1,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "gray",
    fontSize: 16,
  },
});