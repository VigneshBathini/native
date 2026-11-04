// 1.Create a React Native search component that:
// - Has a TextInput
// - Calls searchUsers(query) whenever the user stops typing for 500ms
// - Does not call the API for an empty query
// - Displays the returned users
// - Cancels the previous timer when the query changes

// Assume:
// const searchUsers = async (query) => {
//   // returns [{ id, name }]
// };


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';

const SearchUsers = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // Don't call API for empty query
    if (!search.trim()) {
      setUsers([]);
      setLoading(false);
      return;
    }

    // Start debounce timer
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await searchUsers(search);

        setUsers(response);

      } catch (error) {
        console.log(error);
        setUsers([]);
      } finally {
        setLoading(false);
      }

    }, 500);

    // Cleanup previous timer
    return () => {
      clearTimeout(timer);
    };

  }, [search]);

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search users..."
      />

      {loading && <ActivityIndicator />}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchUsers;

