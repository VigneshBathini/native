import { SafeAreaProvider } from "react-native-safe-area-context";
import {StyleSheet,View,Text} from "react-native"

export default function HomeScreen(){

  return(
    <SafeAreaProvider style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Expo Enthusiest</Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:"flex-start",
     justifyContent:"center",
    alignItems:"center",
     backgroundColor:"#f2f2f2",
  },
  card:{
    width:300,
    padding:20,
    backgroundColor:"white",
    elevation:5,
    borderRadius:12,
    borderWidth:2,
    borderColor:"grey"
  },

  title:{
    fontSize:23,
    fontWeight:"bold"
  },
  subtitle:{
    marginTop:8,
    fontSize:20,
    color:"gray"
  }
})


---------------------------------

import { SafeAreaProvider } from "react-native-safe-area-context";
import {StyleSheet,View,Text} from "react-native"

export default function HomeScreen(){

  return(
    <SafeAreaProvider style={styles.container}>
      <View style= {styles.box}>
      <View style={styles.card}>
        <Text style={styles.title}>Expo Enthusiest</Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>
          Fluzo
        </Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
       <View style={styles.card}>
        <Text style={styles.title}>
          Fluzo2
        </Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:"flex-start",
     justifyContent:"center",
    // alignItems:"center",
     backgroundColor:"#f2f2f2",
  },
  box:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:'center'
  },

  card:{
    justifyContent:"center",
    alignItems:"center",
    width:300,
    padding:20,
    backgroundColor:"white",
    elevation:5,
    borderRadius:12,
    borderWidth:2,
    borderColor:"grey"
  },

  title:{
    fontSize:23,
    fontWeight:"bold"
  },
  subtitle:{
    marginTop:8,
    fontSize:20,
    color:"gray"
  }
})

------------------------

import { SafeAreaProvider } from "react-native-safe-area-context";
import {StyleSheet,View,Text, Pressable} from "react-native"
import {useState} from "react"

export default function HomeScreen(){

  const [state,setState] = useState(0);



  return(
    <SafeAreaProvider style={styles.container}>
      <View style= {styles.box}>
      <View style={styles.card}>
        <Text style={styles.title}>Expo Enthusiest</Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>
          Fluzo
        </Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
       <View style={styles.card}>
        <Text style={styles.title}>
          Fluzo2
        </Text>
        <Text  style={styles.subtitle}>Alberto</Text>
      </View>
    
      {/* <View style={styles.button}> */}
       
      </View>
      <View style={styles.buttonrow}>
          <Text style={styles.state}>
        {state}
      </Text>

         <Pressable
        style={styles.button}
        onPress={()=>setState(prev=>prev+1)}
        >
          <Text>+</Text>
        </Pressable>
      

    
        <Pressable
        style={styles.button}
        onPress={()=>{
          if(state>0){ setState(prev=>prev-1)}
        }}
        >
          <Text>-</Text>
        </Pressable>

        <Pressable style={styles.button}
        onPress={()=>setState(0)}
        >
          <Text>Reset</Text>
        </Pressable>

        <Pressable style={styles.button}
        onPress={()=>{setState(prev=>prev+10)}}
        >
          <Text>Boost 10+</Text>
        </Pressable>
      </View>
      
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:"flex-start",
     justifyContent:"center",
    // alignItems:"center",
     backgroundColor:"#f2f2f2",
  },
  button:{
    paddingVertical:15,
    paddingHorizontal:50,
    borderRadius:10,
    elevation:9,
    backgroundColor:"gray"
  },
 
  state:{
    fontSize:20,
    fontWeight:"bold"
  },
  box:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:'center'
  },
 buttonrow:{
    marginTop:10,
    flexDirection:"row",
    justifyContent:"center",
    gap:50
  },
  card:{
    justifyContent:"center",
    alignItems:"center",
    // width:300,
    padding:20,
    backgroundColor:"white",
    elevation:5,
    borderRadius:12,
    borderWidth:2,
    borderColor:"grey"
  },

  title:{
    fontSize:23,
    fontWeight:"bold"
  },
  subtitle:{
    marginTop:8,
    fontSize:20,
    color:"gray"
  }
})

---------------------------
//login

import {StyleSheet,TextInput,View,Pressable, Alert,Text} from "react-native"
import {useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"

export default function Login(){
  const [email,setEmail] = useState("")
  const [pwd,setPwd] = useState("")

  const Submit=()=>{
    if(!email || !pwd){
      Alert.alert("Enter details properly","OK")
      return;
    }
    Alert.alert("Success","Ok")
  }

  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Login Page</Text>

      <TextInput
       
       placeholder="Enter email"
       value={email}
       onChangeText={setEmail}
       style={styles.input}
      />

      <TextInput
      placeholder="Enter password"
      value={pwd}
      onChangeText={setPwd}
      secureTextEntry
       style={styles.input}
      />

      <Pressable style={styles.submit} onPress={Submit} >
        <Text style={{fontSize:15,fontWeight:"bold"}}>Submit</Text>
        </Pressable>

      <Text style={styles.preview}>Email: {email}</Text>
    </View>
  )

}


const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  },
  heading:{
    fontSize:25,
    fontWeight:"bold",
    color:"rgba(28, 28, 27, 0.13)"
  },

  input:{
    borderWidth:2,
    borderRadius:8,
    paddingVertical:20,
    paddingHorizontal:150,
    marginTop:20
  },
  submit:{
    marginTop:20,
    paddingVertical:18,
    paddingHorizontal:50,
    borderWidth:2,
    backgroundColor:"gray"
  },
  preview:{
    fontSize:20,
    fontWeight:"thin"
  }
})

----------------------------------

import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Home() {

  // State for the current input value
  const [todo, setTodo] = useState("");

  // State for storing all todos
  const [todos, setTodos] = useState<string[]>([]);

  // Add a new todo
  const addTodo = () => {
    // Prevent adding empty or whitespace-only todos
    if (!todo.trim()) return;

    // Functional update because the new state depends on the previous state
    setTodos((prev) => [...prev, todo.trim()]);

    // Clear the input field
    setTodo("");

    // Note: This logs the previous state because state updates are asynchronous
    console.log("Todo List:", todos);
  };

  // Delete a todo using its index
  const delTodo = (index: number) => {
    // Filter out the selected index
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaProvider>
      {/* Prevents content from overlapping with notches/status bars */}
      <SafeAreaView style={styles.container}>

        {/* Screen Title */}
        <Text style={styles.header}>Task Todo</Text>

        {/* Controlled TextInput */}
        <TextInput
          placeholder="Enter todo"
          value={todo}
          onChangeText={setTodo}
          style={styles.textinput}
        />

        {/* Button to add a todo */}
        <Pressable onPress={addTodo} style={styles.addtodo}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Add Todo
          </Text>
        </Pressable>

        {/* Display all todos */}
        <FlatList
          data={todos}

          // Makes the list occupy the available width
          style={{ width: "100%", marginTop: 20 }}

          // Adds padding at the bottom of the list
          contentContainerStyle={{ paddingBottom: 20 }}

          // Unique key for each item
          keyExtractor={(item, index) => index.toString()}

          // Render each todo item
          renderItem={({ item, index }) => (
            <View style={styles.todoitem}>

              {/* Todo Text */}
              <Text
                style={{
                  flex: 1,          // Take remaining horizontal space
                  marginRight: 10,  // Space before Remove button
                  fontSize: 16,
                }}
              >
                {item}
              </Text>

              {/* Remove Button */}
              <Pressable
                onPress={() => delTodo(index)}
                style={styles.del}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Remove
                </Text>
              </Pressable>

            </View>
          )}

          {/* Display when there are no todos */}
          ListEmptyComponent={() => (
            <View>
              <Text>No Data</Text>
            </View>
          )}

          {/* Space between list items */}
          ItemSeparatorComponent={() => (
            <View style={{ height: 20 }} />
          )}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
  },

  // Screen title
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // Input field
  textinput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  // Add button
  addtodo: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "black",
    borderRadius: 8,
  },

  // Each todo row
  todoitem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
  },

  // Remove button
  del: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
});


// Image

import { Image, StyleSheet, View,Text, Pressable, Alert } from "react-native"

export default function Images() {

  return (
    <View style={styles.container}>
      <Image
        // source={require("./assets/icon.png")} for local images
        source={{
          uri: "https://picsum.photos/200"
        }}
        style={{ height: 150, width: 150,borderRadius:150 }}
        resizeMode="cover"
      />

      <Text style={styles.name}> VIZ</Text>

      <Text style={styles.role}> React Native Developer</Text>

      <Pressable onPress={()=>Alert.alert("Yeah lets grow","Buddy")} style= {styles.follow}>
        <Text style={{ color:"white"}}>Follow</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  name:{
    fontSize:20,
    fontWeight:"bold"
  },
  role:{
    fontSize:16,
    fontWeight:"400"
  },
  follow:{
    marginTop:10,
    backgroundColor:"blue",
    elevation:5,
    paddingHorizontal:30,
    paddingVertical:10,
   
  }
})