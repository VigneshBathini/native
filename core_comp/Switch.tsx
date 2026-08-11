import React, { useState } from "react";
import { View, Switch } from "react-native";

export default function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <View>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
      />
      
    {/* 
      value → Controls whether the switch is ON or OFF.
      onValueChange → Called when the user toggles the switch. 
    */}
    </View>
  );
}