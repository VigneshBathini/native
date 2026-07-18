import { useEffect } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

export default function App() {

  useEffect(() => {

    const subscription =
      Linking.addEventListener("url", (event) => {

        console.log(event.url);

        Alert.alert("Deep Link", event.url);

      });

    return () => {
      subscription.remove();
    };

  }, []);

  return null;

}