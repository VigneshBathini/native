import {useState} from 'react'
import {View,Text,Pressable,StyleSheet} from 'react-native'

export default function App(){
  const[count,setCount] = useState(0);


  const increment=()=>{
    setCount(prev=>prev+1)
  }

  const decrement=()=>{
    setCount((prev)=>Math.max(prev-1,0))
  }

 const reset=()=>{
    setCount(0)
  }


  return(
    <View style={styles.container}>
    <Text style={styles.text}>{count}</Text>
    <View style={styles.buttons}>
    <Pressable onPress={increment} style={styles.button}>
    <Text>Increase</Text>
    </Pressable>

    <Pressable onPress={decrement} style={styles.button}><Text>Decrease</Text>
    </Pressable>

    <Pressable onPress={reset} style={styles.button}>
    <Text>Reset</Text>
    </Pressable>
    </View>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
  },
  text:{
    fontSize:15,
    fontWeight:"700"
  },
  button:{
    borderWidth:1,
    borderColor:'gray',
    paddingVertical:10,
    paddingHorizontal:30,
    backgroundColor:'yellow'
  },
  buttons:{
    gap:20,
    flexDirection:'row',
    margin:10
  }
})