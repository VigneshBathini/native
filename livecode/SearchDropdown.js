import {useState} from 'react'
import {View,Text,FlatList,TextInput,StyleSheet,TouchableOpacity} from 'react-native'

export default function SearchDropdown(){

  const [text,setText]= useState("")
  const [showDropdown, setShowDropdown] = useState(true);

  const USERS = [
  { id: "1", name: "John" },
  { id: "2", name: "Alice" },
  { id: "3", name: "David" },
  { id: "4", name: "Emma" },
  { id: "5", name: "Robert" },
];

const filterData= USERS.filter((texts)=>(texts.name).toLowerCase().includes(text.toLowerCase()))
console.log("filder data",filterData)

  return(
    <View  style={styles.container}>
      <TextInput
       placeholder="Search"
       value={text}
       onChangeText={(value)=>{
        setText(value)
        // setShowDropdown(true)
       }}
       onFocus={() => setShowDropdown(true)}
       style={styles.input}
      />

      
      {showDropdown && (
      <FlatList
      data={filterData}
      keyExtractor={(item)=>item.id}
      
      renderItem={({item})=>(
  
        <TouchableOpacity style={styles.list}  onPress={()=>{
          setText(item.name)
          setShowDropdown(false)
        }}>
          <Text>{item.name} </Text>
        </TouchableOpacity>
      )}

      ListEmptyComponent={()=>(
         <Text>No Data found</Text>
      )}

      />
      )
       
      
      }
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:'center',
    alignItems:'center'
  },
  input:{
    borderWidth:1,
    paddingVertical:10,
    paddingHorizontal:40
  },
  list:{
    flex:1,
    borderWidth:1,
    paddingHorizontal:50,
    borderRadius:10,
    margin:5
  },
  list1:{
    flex:1,
    borderWidth:1,
    paddingHorizontal:50,
    borderRadius:10,
    margin:5
  }
})