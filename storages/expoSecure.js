import React from "react";
import { View, Button } from "react-native";

import * as SecureStore from "expo-secure-store";

export default function App() {

  const saveToken = async () => {

    await SecureStore.setItemAsync(
      "token",
      "abc123"
    );

    alert("Token Saved");
  };

  const getToken = async () => {

    const token =
      await SecureStore.getItemAsync("token");

    alert(token ?? "No Token");
  };

  const deleteToken = async () => {

    await SecureStore.deleteItemAsync("token");

    alert("Token Deleted");
  };

  return (
    <View style={{ marginTop: 80 }}>

      <Button
        title="Save Token"
        onPress={saveToken}
      />

      <Button
        title="Get Token"
        onPress={getToken}
      />

      <Button
        title="Delete Token"
        onPress={deleteToken}
      />

    </View>
  );
}