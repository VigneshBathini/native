import { Button, View, Alert } from "react-native";
import * as Notifications from "expo-notifications";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {

  const sendNotification = async () => {

    const permission =
      await Notifications.requestPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Notification permission is required."
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({

      content: {
        title: "React Native",
        body: "Keep practicing every day 🚀",
      },

      trigger: {
        seconds: 5,
      },

    });

    Alert.alert(
      "Notification Scheduled"
    );

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
        title="Schedule Notification"
        onPress={sendNotification}
      />

    </View>

  );

}