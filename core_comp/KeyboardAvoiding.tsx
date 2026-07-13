import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";

<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}
>
  <TextInput placeholder="Enter Name" />
</KeyboardAvoidingView>