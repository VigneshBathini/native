import React from "react";
import { View, Button,StyleSheet,Text } from "react-native";
import { useDispatch,useSelector } from "react-redux";

import {
  increment,
  decrement,
  addAmount
} from "./countSlice";

export default function HomeScreen() {

  console.log("HomeScreen Rendered");
  //Each state change triggers a re-render because count changed.

  // Access Redux Dispatch
  const dispatch = useDispatch();

  // Read data from Redux Store
  const count = useSelector((state) => state.counter.count);


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
        title="Add 10 amount"
        onPress={() => dispatch(addAmount(50))}
      />
       <Text style={styles.text}>
        Count : {count}
      </Text>
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