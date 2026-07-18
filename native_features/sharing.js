import { Button, View, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function App() {

  const sharePDF = async () => {

    const fileUri =
      FileSystem.documentDirectory + "sample.pdf";

    // Check if sharing is supported
    const available =
      await Sharing.isAvailableAsync();

    if (!available) {
      Alert.alert(
        "Sharing is not available on this device."
      );
      return;
    }

    // Check file exists
    const info =
      await FileSystem.getInfoAsync(fileUri);

    if (!info.exists) {
      Alert.alert(
        "File not found."
      );
      return;
    }

    // Open native share sheet
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View
      style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Button
        title="Share PDF"
        onPress={sharePDF}
      />
    </View>
  );
}