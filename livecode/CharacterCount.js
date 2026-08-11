// Character Counter
// Build a Character Counter component.

// Requirements
// TextInput
// Show current character count
// 0 / 100
// Maximum 100 characters
// Disable typing after 100 characters
// Count text should turn red after 80 characters
// Show
// Character limit reached

// when the limit is hit.

// Concepts Tested
// Controlled TextInput
// Derived state
// Conditional rendering
// Dynamic styles
// Validation
// String manipulation

import {useState,useEffect} from "react";
import {View,Text,TextInput,StyleSheet} from 'react-native'

export default function CharcterCount(){

  const [text,setText] = useState("")
  // const [count,setCount] = useState(0)

  const count = text.length;

  // useEffect(()=>{
  //   console.log(text.length)
  //   setCount(text.length)
  // },[text])

  return(
    <View style={styles.container}>
    <TextInput 
    placeholder="Max characters 100"
    value={text}
    onChangeText={setText}
    style={[styles.text,
      // count>=80? {color:'red'}:{color:'black'}
    ]}
    maxLength={100}
    
    />

    <Text style={{
color:count>=80?'red':'black'
}}> {count<100?count +'/100':'Characters limit rached'}</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    borderWidth:1,
    paddingVertical:10,
    paddingHorizontal:20
  }
})

