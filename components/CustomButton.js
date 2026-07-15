import { Pressable,Text } from "react-native";

export default function CustomButton(props){
    return(
        <Pressable>
            {/* <Text> Click here</Text> */}
            <Text> {props.title} </Text>
        </Pressable>
    )
}


// A Custom Component is a reusable UI component created by the developer.

// 🧠 Why?
// Reuse code
// Keep UI consistent
// Easier maintenance
// Better project structure


// Production Usage
// Buttons
// Inputs
// Cards
// Headers
// Footers
// Empty State Views
// Loading Components