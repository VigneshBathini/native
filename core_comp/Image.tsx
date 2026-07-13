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