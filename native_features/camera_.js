import { useState } from "react";
import { View, Button, Text } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [status, setStatus] = useState("");

  const requestPermission = async () => {
    const permission =
      await Camera.requestCameraPermissionsAsync();

    console.log(permission);

    setStatus(permission.status);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Button
        title="Request Camera Permission"
        onPress={requestPermission}
      />

      <Text>Status : {status}</Text>
    </View>
  );
}