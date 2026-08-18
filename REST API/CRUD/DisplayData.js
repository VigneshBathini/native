import { View, Button,TextInput,FlatList,Text } from 'react-native';
import {  useState } from 'react';

export default function Home() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [userId,setUserId] = useState("")
    const [users,setUsers] = useState([])

    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    // GET
    const getData = async () => {

        try {
            const response = await fetch(API_URL); //Receiving JSON:JSON response → JavaScript object
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`) //HTTP 404 / 500 -> fetch usually DOES NOT throw -> you throw manually
            }
            const data = await response.json();
            console.log('Status:', response.status);
             console.log('OK:', response.ok);
              console.log('Data:', data);
            setUsers(data)

        }
        catch (error) {
            console.log("API error", error)
        }
    };

    // POST
    const postData = async () => {
        try{
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({               //Sending JSON:JavaScript object → JSON string
                name,
                email,
            }),
        });

   

        if(!response.ok){ 
            throw new Error(`Http status: ${response.status}`)
        }

        const data = await response.json();
             console.log('Status:', response.status);
             console.log('OK:', response.ok);
              console.log('Post Data:', data);

       
    }
    catch(error){
        console.log("API error",error)
    }
    };

    // PUT
    const updateData = async () => {
        try{
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
            }),
        });
        
        if(!response.ok){
            throw new Error(`Http error:${response.status}`)
        }

        const data = await response.json();
             console.log('Status:', response.status);
             console.log('OK:', response.ok);
            
        console.log('PUT data:', data);
    }
    catch(error){
        console.log("API Error",error)
    }
    };

    // DELETE
    const deleteData = async () => {
        try{
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE',
        });

        if(!response.ok){
            throw new Error(`http error: ${response.status}`)
        }

        console.log('DELETE status:', response.status);
             console.log('Status:', response.status);
             console.log('OK:', response.ok);

    }
    catch(error){
        console.log("API error",error)
    }
    };

    return (
        <View>
            <TextInput
             placeholder='Enter Name'
             value={name}
             onChangeText={setName}   
            />

            <TextInput
             placeholder='Enter email'
             value={email}
             onChangeText={setEmail}
            />

            <TextInput
            placeholder='Enter User ID'
            value={userId}
            onChangeText={setUserId}
            />

            <Button title="Display Users" onPress={getData} />

            <Button title="Create User" onPress={postData} />

            <Button title="Update User" onPress={updateData} />

            <Button title="Delete User" onPress={deleteData} />

            <FlatList
             data={users}
             keyExtractor={(item)=> item.id.toString()}
             renderItem={({item})=>(
                <View>
                    <Text>{item.name}</Text>
                     <Text>{item.email}</Text>
                </View>
             )}
            />
        </View>
    );
}