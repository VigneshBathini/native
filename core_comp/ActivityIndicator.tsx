import { View, ActivityIndicator, StyleSheet,Text } from "react-native";
import {useState} from "react"

export default function app() {

    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"        // Spinner size
                color="blue"        // Spinner color
                animating={true}    // Start/Stop animation
                hidesWhenStopped={true} // iOS: Hide when animating is false
            />

            {
                loading ? (
                    <ActivityIndicator />
                ):(
                    <Text>Data Loaded</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})