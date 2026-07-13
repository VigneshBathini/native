import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from "react-native";
import { useState } from "react"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Home() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState<string[]>([])

  const addTodo = () => {
    if (!todo.trim()) return;
    setTodos((prev) => [...prev, todo.trim()]);
    setTodo("")

    console.log("todo list", todos)
  }

  const delTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index))
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.layout}> */}
        <Text style={styles.header}>Task todo</Text>

        <TextInput
          placeholder="Enter todo"
          value={todo}
          onChangeText={setTodo}
          style={styles.textinput}
        />

        <Pressable onPress={addTodo} style={styles.addtodo}>
          <Text style={{ color: "white", textAlign: "center" }}>Add todo</Text>
        </Pressable>

        <FlatList
          data={todos}
          style={{ width: "100%", marginTop: 20 }} // style = styles the list itself (the outer box).
          contentContainerStyle={{ paddingBottom: 20 }}  // contentContainerStyle = styles what is inside the list (the scrollable content containing the items).
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.todoitem}>
              <Text
                style={{
                  flex: 1,
                  marginRight: 10,
                  fontSize: 16,
                }}
              >{item}</Text>
              <Pressable onPress={() => delTodo(index)} style={styles.del}>
                <Text style={{ color: "white", textAlign: "center" }}>Remove</Text>
              </Pressable>
            </View>
          )
          }
          ListEmptyComponent={(
            <View>
              <Text> No Data</Text>  
            </View>
          )}

          ItemSeparatorComponent={() =>
            <View style={{ height: 20 }} />

          }
        />

        {/* </View> */}
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10
  },
  layout: {
    gap: 10,
    alignItems: "center"
  },

  textinput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  addtodo: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "black",
    borderRadius: 8,
  },
  todoitem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
  },
  del: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold"
  }
})

// -- slight adv

// import { View, Text, TextInput, FlatList, StyleSheet, Pressable,KeyboardAvoidingView } from "react-native";
// import { useState,useEffect } from "react"
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

// export default function Home() {

//   type Todo = {
//   id: string;
//   title: string;
//   };

//   const [todo, setTodo] = useState("")
//   // const [todos, setTodos] = useState<string[]>([])

//    const [todos, setTodos] = useState<Todo[]>([])

//     // const addTodo = () => {
//     //   if (!todo.trim()) return;
//     //   setTodos((prev) => [...prev, todo.trim()]);
//     //   setTodo("")

//     //   console.log("todo list", todos)
//     // }
    
//    useEffect(() => {
//   console.log("Todo List:", todos); // here it will provide latest data as state updates it will console
// }, [todos]);
  
// const addTodo = () => {
//     if (!todo.trim()) return;
    
//     setTodos((prev) => [...prev, {
//       id:Date.now().toString(),
//       title:todo.trim()
      
//     }]);
     
//     setTodo("")
//     console.log("todo list", todos) // here it will provide old data cause setTodos() schedules a state update; it doesn't update todos immediately.
   
//   }


//   // const delTodo = (index: number) => {
//   //   setTodos((prev) => prev.filter((_, i) => i !== index))
//   // }

  
//   const delTodo = (id: string) => {
//     setTodos((prev) => prev.filter((item) => item.id !== id))
//   }



//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <KeyboardAvoidingView
//   behavior="padding"
//   style={{ flex: 1 }}
// >
//         {/* <View style={styles.layout}> */}
//         <Text style={styles.header}>Task todo</Text>

//         <TextInput
//           placeholder="Enter todo"
//           value={todo}
//           onChangeText={setTodo}
//           style={styles.textinput}
          
//         />

//         <Pressable onPress={addTodo} style={[styles.addtodo, !todo.trim() && styles.disabledButton]}
//          disabled={!todo.trim()}>
//           <Text style={{ color: "white", textAlign: "center" }}>Add todo</Text>
//         </Pressable>

//         <FlatList
//           data={todos}
//           style={{ width: "100%", marginTop: 20 }}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           // keyExtractor={(item, index) => index.toString()}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.todoitem}>
//               <Text
//                 style={{
//                   flex: 1,
//                   marginRight: 10,
//                   fontSize: 16,
//                 }}
//               >{item.title}</Text>
//               <Pressable 
//               onPress={() => delTodo(item.id)} 
//               style={styles.del}
             
//               >
//                 <Text style={{ color: "white", textAlign: "center" }}>Remove</Text>
//               </Pressable>
//             </View>
//           )
//           }
//           ListEmptyComponent={(
//             <View>
//               <Text> No Data</Text>
//             </View>
//           )}

//           ItemSeparatorComponent={() =>
//             <View style={{ height: 20 }} />

//           }
//         />

//         {/* </View> */}
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </SafeAreaProvider>

//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 10
//   },
//   layout: {
//     gap: 10,
//     alignItems: "center"
//   },

//   textinput: {
//     width: "100%",
//     borderWidth: 2,
//     borderColor: "gray",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//   },
//   addtodo: {
//     width: "100%",
//     paddingVertical: 14,
//     backgroundColor: "black",
//     borderRadius: 8,
//   },
//   disabledButton:{
//     backgroundColor:"#999"
// },
//   todoitem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#f2f2f2",
//     padding: 12,
//     borderRadius: 8,
//   },
//   del: {
//     backgroundColor: "red",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 6,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold"
//   }
// })





