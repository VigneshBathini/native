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

// Re-render only if props change
export default React.memo(Child);