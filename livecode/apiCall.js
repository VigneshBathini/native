// Create a React Native screen that:
// 1. Displays a button called Fetch Users.
// 2. When clicked, fetch users from an API.
// 3. Displays a loading indicator while fetching.
// 4. Displays the users using FlatList.
// 5. Displays an error message if the API fails.
// 6. Prevents multiple API calls while loading.
// API:"https://jsonplaceholder.typicode.com/users";

import { useState, useRef } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator, RefreshControl } from 'react-native'


export default function app() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const isFetching = useRef(false)

    const API = "https://jsonplaceholder.typicode.com/users";

    const fetchUsers = async (isRefresh = false) => {
        if (isFetching.current) return;
        isFetching.current = true;
        // if(loading) return;
        try {
            setError('');


            if (isRefresh) {
                setRefreshing(true)
            } else {
                setLoading(true)
            }

            const response = await fetch(API)
            if (!response.ok) {
                throw new Error("Failed to fetch users")
            }

            const data = await response.json()
            setUsers(data)

        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setLoading(false)
            setRefreshing(false)
            isFetching.current = false;
        }
    }

    return (
        <View>
            <Button title='Fetch users' onPress={() => fetchUsers()} disabled={loading} />
            {loading && <ActivityIndicator size={'large'} />}

            {error && <Text>{error}
            </Text>}

            {!error && !loading &&
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={()=>fetchUsers(true)}
                        />
                    }
                />
            }
        </View>
    )
}