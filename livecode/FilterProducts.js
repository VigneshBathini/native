// Problem

// Build a product list with:

// Search by product name
// Filter by category
// Sort by price
// Reset all filters
// Show "No products found" when nothing matches
// Data
// const PRODUCTS = [
//   { id: 1, name: "iPhone 15", category: "Mobile", price: 70000 },
//   { id: 2, name: "Samsung S24", category: "Mobile", price: 65000 },
//   { id: 3, name: "MacBook Air", category: "Laptop", price: 90000 },
//   { id: 4, name: "Dell XPS", category: "Laptop", price: 85000 },
//   { id: 5, name: "Sony Headphones", category: "Audio", price: 12000 },
//   { id: 6, name: "AirPods Pro", category: "Audio", price: 25000 },
// ];
// Expected UI
// Search: [______________]

// Category:
// [All] [Mobile] [Laptop] [Audio]

// Sort:
// [None] [Low → High] [High → Low]

// ----------------------------

// iPhone 15       ₹70000
// Samsung S24     ₹65000
// MacBook Air     ₹90000
// ...

// [Reset Filters]


import {View,Text,Pressable,FlatList,StyleSheet,TextInput} from 'react-native';
import {useState} from 'react'


export default function ProductFilter(){

  const PRODUCTS = [
  { id: 1, name: "iPhone 15", category: "Mobile", price: 70000 },
  { id: 2, name: "Samsung S24", category: "Mobile", price: 65000 },
  { id: 3, name: "MacBook Air", category: "Laptop", price: 90000 },
  { id: 4, name: "Dell XPS", category: "Laptop", price: 85000 },
  { id: 5, name: "Sony Headphones", category: "Audio", price: 12000 },
  { id: 6, name: "AirPods Pro", category: "Audio", price: 25000 },
  ];

  const [searchText,setSearchText] = useState("");

  const [category,setSelectedCategory] = useState("All")

  const [sorting,setSorting]=useState("None")

  const FilterProducts= PRODUCTS.filter((item)=>{
    const itemSearch=item.name.toLowerCase().includes(searchText.toLowerCase())
    const filterCat= item.category==category || category=="All"
  
    return itemSearch && filterCat;
    })

    const result = [...FilterProducts]

    result.sort((a,b)=>{
      if(sorting=="High") return b.price-a.price 
      else if(sorting=="Low") return a.price-b.price
      return 0;

    })


  const reset=()=>{
    setSearchText("");
    setSelectedCategory("All");
    setSorting("None")
    
  }

  return(
    <View>
      <TextInput
       placeholder='Search products here'
       value={searchText}
       onChangeText={setSearchText}
       style={styles.input}
      />

      <View>
        <Pressable onPress={()=>setSelectedCategory("All")}>
        <Text>All</Text>
        </Pressable>
        <Pressable onPress={()=>setSelectedCategory("Mobile")}>
        <Text>Mobile</Text>
        </Pressable>
        <Pressable onPress={()=>setSelectedCategory("Audio")}>
        <Text>Audio</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedCategory("Laptop")}>
        <Text>Laptop</Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={()=>setSorting("None")}>
          <Text> None</Text>
        </Pressable>
        <Pressable onPress={()=>setSorting("Low")}>
          <Text> {"Low-> High"}</Text>
        </Pressable>
        <Pressable onPress={()=>setSorting("High")}>
         <Text>{"High -> Low"}</Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={()=>reset()}><Text>RESET</Text></Pressable> 
      </View>

      {
        result.length==0? <View><Text>Item not found</Text></View>
    :(
      <FlatList
      data={result}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>(
        <View>
          <Text>{item.name}</Text>
          <Text>{item.category}</Text>
          <Text>{item.price}</Text>
        </View>
      )}
      />
    )

    }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  input:{
    borderWidth:1,
    borderRadius:5,
    paddingVertical:10,
    margin:5
  }
})