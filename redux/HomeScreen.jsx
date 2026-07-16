import React from "react";
import { View, Button,StyleSheet,Text } from "react-native";
import { useDispatch,useSelector } from "react-redux";

import {
  increment,
  decrement,
  addAmount
} from "./countSlice";
import { login } from "./authSlice";
import { toggleTheme } from "./themeSlice";

export default function HomeScreen() {

  console.log("HomeScreen Rendered");
  //Each state change triggers a re-render because count changed.

  // Access Redux Dispatch
  const dispatch = useDispatch();

  // Read data from Redux Store
  const count = useSelector((state) => state.counter.count);

  //access user
  const user = useSelector(state=>state.auth.user)
//token
const token = useSelector(state=>state.auth.token)


  //access theme
  const mode = useSelector(state=>state.theme.mode) 

  return (
       <View style={styles.container}>

      <Button
        title="Increment"
        onPress={() => dispatch(increment())}
      />

      <Button
        title="Decrement"
        onPress={() => dispatch(decrement())}
      />

      <Button
        title="Add 50 amount"
        onPress={() => dispatch(addAmount(50))}
      />

      <Button
        title="Login"
        onPress={()=> dispatch(login({
          user:"Vignesh",
          token:"28392dd"
        }))} 
      />
      <Button
        title = "toggle theme"
        onPress={()=>dispatch(toggleTheme())}
      />
       <Text style={styles.text}>
        Count : {count}
      </Text>

      <Text style={styles.text}>User: {user}</Text>
       <Text style={styles.text}>Token:{token}</Text>
        <Text style={styles.text}> mode: {mode}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
});