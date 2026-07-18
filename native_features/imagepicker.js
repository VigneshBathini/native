import { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Gallery permission is required."
      );
      return;
    }

    // Open gallery
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Choose Image"
        onPress={pickImage}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});