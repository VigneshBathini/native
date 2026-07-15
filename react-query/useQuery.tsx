import { FlatList, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api";

export default function UseQuery() {

  const {
    data,
    isLoading,
    error,
  } = useQuery({

    // Unique cache ID
    queryKey: ["posts"],

    // Function to fetch data
    queryFn: getPosts,

  });

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error Loading Data</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>{item.title}</Text>
      )}
    />
  );
}