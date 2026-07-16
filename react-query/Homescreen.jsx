// step4

import React from "react";
import {
    FlatList,
    Text,
    ActivityIndicator,
    View,
    StyleSheet,
    Button,
} from "react-native";

import {
    useQuery,
    useQueryClient, // Import Query Client
    useMutation, // Import Mutation Hook
} from "@tanstack/react-query";

import { getPosts, createPost } from "./api";



export default function HomeScreen() {

    // Access React Query Cache
    const queryClient = useQueryClient();

    const mutation = useMutation({

        // Function to execute
        mutationFn: createPost,

        // Runs after successful API call
        onSuccess: () => {

            console.log("Post Created");

            // Refresh posts list
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });

        },

    });

    // Fetch posts/items using React Query
    const {
        data,
        isLoading,
        error,
    } = useQuery({

        // Unique Cache ID
        queryKey: ["posts"],

        // Function to fetch data
        queryFn: getPosts,

    });

    // Loading State
    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    // Error State
    if (error) {
        return <Text>Something went wrong.</Text>;
    }

    // Success State
    return (
        <View style={{ flex: 1 }}>

            {/* Button to view cached data */}
            <View style={{ marginTop: 60, alignItems: "center" }}>
                <Button
                    title="Show Cache"
                    onPress={() => {
                        console.log(
                            "Cached Data:",
                            queryClient.getQueryData(["posts"])
                        );
                    }}
                />

                <Button
                    title="Show Query State"
                    onPress={() => {
                        console.log(
                            queryClient.getQueryState(["posts"])
                        );
                    }}
                />

                <Button
                    title="Create Post"
                    onPress={() =>

                        mutation.mutate({

                            title: "Learning React Query",

                            body: "My First Mutation",

                            userId: 1,

                        })

                    }
                />
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>ID : {item.id}</Text>
                        <Text>Title : {item.title}</Text>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
});


// useQuery

// Fetches data from the server.

// useMutation

// Changes data on the server (POST, PUT, DELETE).

// mutationFn

// The function that performs the API request.

// mutate()

// Starts the mutation.

// onSuccess

// Runs after a successful mutation.

// invalidateQueries

// Marks cached data as stale and refetches it.