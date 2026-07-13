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