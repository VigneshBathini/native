import { View, Pressable, Text } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Login Button"
        accessibilityHint="Double tap to login"
        onPress={() => {}}
        style={{
          backgroundColor:"#2196F3",
          padding:15,
          borderRadius:10
        }}
      >
        <Text style={{color:"#fff"}}>
          Login
        </Text>
      </Pressable>
    </View>
  );
}