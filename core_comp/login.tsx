import {StyleSheet,TextInput,View,Pressable, Alert,Text} from "react-native"
import {useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"

export default function Login(){
  const [email,setEmail] = useState("")
  const [pwd,setPwd] = useState("")

  const Submit=()=>{
    if(!email || !pwd || pwd.length <8){
      Alert.alert("Enter details properly","OK")
      return;
    }
    Alert.alert("Success","Ok")
    setEmail("")
    setPwd("")

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

      <Pressable style={styles.submit} onPress={Submit} 
      disabled={!email||!pwd}
      >
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

//

// import {
//   View,
//   TextInput,
//   Pressable,
//   Text,
//   Alert,
// } from "react-native";
// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");

//   const onSubmit = async () => {
//     // 1. Validation
//     if (!email || !pwd) {
//       Alert.alert("Please enter email and password");
//       return;
//     }

//     try {
//       // 2. API call
//       const response = await fetch("YOUR_API_URL", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: pwd,
//         }),
//       });

//       // 3. Convert response
//       const data = await response.json();

//       // 4. Handle response
//       if (response.ok) {
//         Alert.alert("Success", "Login successful");
//         console.log("data", data);
//       } else {
//         Alert.alert("Login Failed", data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.log("Login error", error);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         placeholder="Password"
//         value={pwd}
//         onChangeText={setPwd}
//         secureTextEntry
//       />

//       <Pressable onPress={onSubmit}>
//         <Text>Login</Text>
//       </Pressable>
//     </View>
//   );
// }

