import React from "react";
import {
    View,
    Button,
    Text,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

    const saveData = async () => {

        await AsyncStorage.setItem(
            "theme",
            "dark"
        );

        alert("Saved");
    };

    const getData = async () => {

        const value =
            await AsyncStorage.getItem("theme");

        alert(value);
    };

    const removeData = async () => {

        await AsyncStorage.removeItem("theme");

        alert("Removed");
    };

    return (

        <View style={{ marginTop: 80 }}>

            <Button
                title="Save Theme"
                onPress={saveData}
            />

            <Button
                title="Get Theme"
                onPress={getData}
            />

            <Button
                title="Remove Theme"
                onPress={removeData}
            />

        </View>

    );
}