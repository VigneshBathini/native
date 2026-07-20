import React, { memo } from "react";
import { FlatList, Text, View } from "react-native";

const DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i),
  name: `User ${i}`,
}));

const Item = memo(({ item }) => (
  <View
    style={{
      padding: 15,
      borderBottomWidth: 1,
    }}
  >
    <Text>{item.name}</Text>
  </View>
));

export default function App() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
    />
  );
}