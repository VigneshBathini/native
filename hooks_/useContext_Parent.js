// What is useContext?

// useContext is a React Hook that allows a 
// component to read data from a Context without passing props through every intermediate component.

import {createContext} from "react";
import {View} from "react-native"
import User from "./useContext_childuser"


export const UserContext = createContext(); // Step 1: Create Context

export default function App(){
    return(
        <View style={{marginTop:50}}>
                {/* Step 2: Provide Value */}
            <UserContext.Provider value={"Viz"}> 
                <User />
            </UserContext.Provider>

        </View>
    )   
}
