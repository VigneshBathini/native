import { useState } from "react"
import {View,Text,Modal,StyleSheet, Button} from "react-native"

export default function app(){

    const [visible,setVisible] = useState(false);


    return(
        <View style= {stlyes.container}>
        <Button
        onPress={()=>setVisible(true)}
        title="Click here"
        />

        <Modal 
        visible={visible} 
        animationType="slide" //Modal slides from the bottom.
        transparent={true} //Background remains visible behind the modal.
        onRequestClose={() => setVisible(false)} //This function is called when the user attempts to close the modal, 
        //for example by pressing the back button on Android.
        >
            <View>
                <Text>Hi</Text>
            </View>
            <Button
             onPress={()=>setVisible(false)} 
             title="Close"   
            />
        </Modal>



        </View>
    )
}

const stlyes = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    }
})