import { useContext} from "react"
import {Text,View} from "react-native"
import { UserContext } from "../App";

export default function user(){
     // Step 3: Consume Context
    const user= useContext(UserContext);

    return(
        <View style={{marginTop:50}}>
            <Text>{user}</Text>
        </View>
    )
}
