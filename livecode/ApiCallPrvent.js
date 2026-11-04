// Create a React Native screen that:
// 1. Displays a button called Fetch Users.
// 2. When clicked, fetch users from an API.
// 3. Displays a loading indicator while fetching.
// 4. Displays the users using FlatList.
// 5. Displays an error message if the API fails.
// 6. Prevents multiple API calls while loading.
// API:


import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/users";

  const fetchUsers = async () => {
    // Prevent another call while loading
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Button
        title="Fetch Users"
        onPress={fetchUsers}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="large" />}

      {error && <Text>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />
      )}

    </View>
  );
}


// with useref


import {useState,useRef} from 'react'
import {View,Text,Button,FlatList,ActivityIndicator} from 'react-native'


export default function app(){
    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const isFetching = useRef(false)

    const API= "https://jsonplaceholder.typicode.com/users";
    
    const fetchUsers =async ()=>{
        if(isFetching.current) return ;
         isFetching.current=true;
        // if(loading) return;
        try{
            setError('');
            setLoading(true)
           
            const response= await fetch(API)
            if(!response.ok){
                throw new Error("Failed to fetch users")
            }

            const data = await response.json()
            setUsers(data)

        }
        catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false)
            isFetching.current=false;
        }
    }

    return(
        <View>
            <Button title='Fetch users' onPress={()=>fetchUsers()}   disabled={loading}/>
            {loading && <ActivityIndicator size={'large'}/> }

            {error &&<Text>{error}
            </Text>}

            { !error && !loading &&
            <FlatList
            data={users}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
                <View>
                    <Text>{item.name}</Text>
                </View>
    )}
            />
        }
        </View>
    )
}