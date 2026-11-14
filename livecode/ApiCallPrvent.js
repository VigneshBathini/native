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



import { useState, useRef } from 'react';

import {
    View,
    Text,
    Button,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

export default function App() {

    // Stores the complete list of users received from the API.
    const [users, setUsers] = useState([]);

    // Controls the initial loading indicator.
    // true  = API is fetching
    // false = API has completed
    const [loading, setLoading] = useState(false);

    // Stores the error message if API request fails.
    // Empty string means no error.
    const [error, setError] = useState('');

    // Controls the pull-to-refresh indicator in FlatList.
    const [refreshing, setRefreshing] = useState(false);

    // Initially display only 3 users.
    // Every Load More click increases this count by 3.
    const [visibleCount, setVisibleCount] = useState(3);

    // useRef creates a synchronous lock to prevent duplicate API calls.
    // Unlike useState, updating .current does not trigger re-render.
    const isFetching = useRef(false);

    const API = "https://jsonplaceholder.typicode.com/users";


    // isRefresh = false is a DEFAULT PARAMETER.
    // fetchUsers()      -> isRefresh = false (normal API call)
    // fetchUsers(true)  -> isRefresh = true  (pull-to-refresh)
    const fetchUsers = async (isRefresh = false) => {

        // If another API request is already running, stop here.
        if (isFetching.current) return;

        // Lock immediately so another request cannot start.
        isFetching.current = true;

        try {

            // Clear any previous error before retrying.
            setError('');

            // Show the appropriate loading indicator.
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            // Make API request and wait for response.
            const response = await fetch(API);

            // fetch() does not automatically throw for HTTP 404/500.
            // response.ok is true only for successful HTTP 2xx responses.
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            // Convert API response into JavaScript data.
            // response.json() also returns a Promise, so use await.
            const data = await response.json();

            // Store the complete API response in users state.
            setUsers(data);

            // Reset pagination after successfully fetching fresh data.
            setVisibleCount(3);

        } catch (error) {

            // If network or API processing fails, display the error.
            setError(error.message);

        } finally {

            // finally executes whether API succeeds or fails.
            // Stop both loading indicators.
            setLoading(false);
            setRefreshing(false);

            // Release the lock so future API calls are allowed.
            isFetching.current = false;
        }
    };


    // Load 3 additional users whenever Load More is clicked.
    // Functional update uses the previous state value.
    const loadMore = () => {
        setVisibleCount(prev => prev + 3);
    };


    return (
        <View style={{ flex: 1, padding: 20 }}>

            {/* Normal API fetch button */}
            <Button
                title="Fetch Users"
                onPress={fetchUsers}

                // Disable while either type of API request is running.
                disabled={loading || refreshing}
            />

            {/* Display loader during normal API fetching */}
            {loading && (
                <ActivityIndicator size="large" />
            )}

            {/* Display error if API request fails */}
            {error !== '' && (
                <Text>{error}</Text>
            )}

            {/* Display only the required number of users.
                slice(0, visibleCount) returns users from index 0
                up to, but not including, visibleCount. */}
            <FlatList
                data={users.slice(0, visibleCount)}

                // Each user needs a unique key for efficient list rendering.
                keyExtractor={(item) => item.id.toString()}

                // Display each user.
                renderItem={({ item }) => (
                    <View style={{ padding: 10 }}>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                    </View>
                )}

                // Pull-to-refresh configuration.
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}

                        // Pass true to indicate this is a refresh request.
                        onRefresh={() => fetchUsers(true)}
                    />
                }

                // Show a message when the list is empty.
                ListEmptyComponent={
                    !loading && error === '' ? (
                        <Text>No users available. Fetch users to begin.</Text>
                    ) : null
                }
            />

            {/* Show Load More only when:
                1. Users are available.
                2. More users exist beyond the visible count. */}
            {users.length > 0 && visibleCount < users.length && (
                <Button
                    title="Load More"
                    onPress={loadMore}
                />
            )}

        </View>
    );
}

