import {useState} from 'react'
import {View,Text, Button,TextInput} from 'react-native'


const appx = ()=>{

    const[input,setInput] = useState('')
    const[showpassword,setShowpassword] = useState('')

    

    return (
        <View>
            <TextInput value={input} onChangeText={setInput}
            secureTextEntry={!showpassword}
            />
        </View>
    )
}

export default appx

// import {useState} from 'react'
// import {View,Text, Button} from 'react-native'


// const appx = ()=>{

//     const[theme,setTheme] = useState(false)

//     const onTheme=()=>{
//         setTheme(!theme)
//     }

    

//     return (
//         <View
//         style={
//             {
//                 flex:1,
//                 backgroundColor:theme?'black':'white'
//             }
//         }
//         >
//               <Text style={{ color: theme ? 'white' : 'black' }}>
//         {theme ? 'Dark Mode' : 'Light Mode'}
//       </Text>

//             <Button title={theme? "light mode": "dark mode"} onPress={onTheme}/>
              
//         </View>
//     )
// }

// export default appx



// import {useState} from 'react'
// import {View,Text, Button} from 'react-native'


// const appx = ()=>{

//     const[count,setCount] = useState(0)

//     const onIncrease=()=>{
//         setCount(prev=> prev+1)
//     }

//      const onDecrease=()=>{
//         // setCount(prev=> prev-1)
//         setCount(prev => Math.max(0, prev - 1));
//     }

//      const onReset=()=>{
//         setCount(0)
//     }

//     return (
//         <View>
//             <Text>
//                 {count}
//             </Text>

//             <Button title="Increase" onPress={onIncrease}/>
//                <Button title="Decrease" onPress={onDecrease}/>
//                   <Button title="Reset" onPress={onReset}/>
//         </View>
//     )
// }

// export default appx