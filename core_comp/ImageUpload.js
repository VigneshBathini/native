import * as ImagePicker from "expo-image-picker";
import { Button, View } from "react-native";

export default function App() {
  const uploadImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return;

    const image = result.assets[0];

    const formData = new FormData();

    formData.append("image", {
      uri: image.uri,
      name: image.fileName || "photo.jpg",
      type: image.mimeType || "image/jpeg",
    });

    const response = await fetch(
      "http://192.168.1.15:5000/upload", // <-- Replace with your PC IP
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}

// I use expo-image-picker to let the user select an image, which returns a local file URI along with metadata
// like the MIME type and filename. I then create a FormData object, append the image using its uri, type, and
// name, and send it to the backend with a multipart/form-data POST request using fetch or axios. On the server,
// I use middleware such as Multer to parse the multipart request, store the file locally or upload it to
// a cloud service like AWS S3 or Cloudinary, and return the image URL, which the app stores for 
//  future use

//-------

import * as ImagePicker from "expo-image-picker";
import { Button, View } from "react-native";

export default function App() {
  const uploadImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return;

    const image = result.assets[0];
    console.log("image",image);

    const formData = new FormData();

    formData.append("image", {
      uri: image.uri,
      name: image.fileName || "photo.jpg",
      type: image.mimeType || "image/jpeg",
    });

    console.log("formdata",formData)

    const response = await fetch(
      "http://192.168.29.210/upload", // <-- Replace with your PC IP
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}