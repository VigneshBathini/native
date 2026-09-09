import React from "react";
import { Button } from "react-native";

function Child({ onPress }) {
  console.log("🟢 Child Render");

  return (
    <Button
      title="Child Button"
      onPress={onPress}
    />
  );
}

export default React.memo(Child);