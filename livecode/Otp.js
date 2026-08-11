import { useRef, useState } from 'react'
import {View,TextInput,StyleSheet} from 'react-native'

export default function Otp(){

  const[otp,setOtp] = useState(["","","",""])

  const inputRef = useRef([]);

  const handleKeyPress = ({ nativeEvent }, index) => {
  if (
    nativeEvent.key === "Backspace" &&
    otp[index] === "" &&
    index > 0
  ) {
    inputRef.current[index - 1]?.focus();
  }
};

  const handleChange=(text,index)=>{
    
    const newOtp= [...otp]
    newOtp[index]=text
    setOtp(newOtp)
    
    if (text && index < otp.length - 1) {
  inputRef.current[index + 1]?.focus();
}
  }

  return(
    <View style={styles.container}>
      {
        otp.map((digit,index)=>(
         <TextInput
  ref={(ref) => (inputRef.current[index] = ref)}
  key={index}
  value={digit}
  onChangeText={(text) => handleChange(text, index)}
  onKeyPress={(e) => handleKeyPress(e, index)}
  style={styles.input}
  keyboardType="numeric"
  maxLength={1}
/>
        ))
      }
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap:10
  },
  input:{
    borderWidth:1,
    width:20
  }
})

// import { useRef, useState } from 'react'
// import {View,TextInput,StyleSheet} from 'react-native'

// export default function Otp(){

//   const[otp,setOtp] = useState(["","","",""])

//   const inputRef = useRef([]);

//   const handleChange=(text,index)=>{
    
//     const newOtp= [...otp]
//     newOtp[index]=text
//     setOtp(newOtp)
    
//     if (text && index < otp.length - 1) {
//   inputRef.current[index + 1]?.focus();
// }
//   }

//   return(
//     <View style={styles.container}>
//       {
//         otp.map((digit,index)=>(
//           <TextInput
//             ref={(ref) => (inputRef.current[index] = ref)}
//             key={index}
//             value={digit}
//             onChangeText={(text)=>handleChange(text,index)}
//             style={styles.input}
//             keyboardType='numeric'
//             maxLength={1}
//           />
//         ))
//       }
//     </View>
//   )
// }

// const styles= StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',
//     flexDirection:'row',
//     gap:10
//   },
//   input:{
//     borderWidth:1,
//     width:20
//   }
// })