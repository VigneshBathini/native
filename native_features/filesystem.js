import { Button, View, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

export default function App() {

  const downloadFile = async () => {

    try {

      const fileUri =
        FileSystem.documentDirectory + "sample.pdf";

      const result =
        await FileSystem.downloadAsync(
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileUri
        );

      console.log(result);

      Alert.alert(
        "Downloaded",
        result.uri
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Download Failed"
      );

    }

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
        title="Download PDF"
        onPress={downloadFile}
      />

    </View>

  );

}