import {useState} from 'react';
import {View,Text,TextInput,StyleSheet,Button} from 'react-native'

export default function Password(){
  const[password,setPassword] = useState("");
  const[showPassword,setShowPassword] = useState(false);
  
  const togglePassword=()=>{
    setShowPassword((prev)=>!prev)
  }
  return(
    <View style={styles.container}>
    <TextInput
    placeholder="Enter password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    style={styles.input}
    />
    
    <Button title={showPassword?'Hide':'Show'} onPress={togglePassword}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
   input:{
    paddingVertical:10,
    borderWidth:1,
    padding:10
  }

})