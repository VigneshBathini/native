import {
  View,
  Button,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // =========================
  // GET
  // =========================

  const getData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setUsers(data);

      console.log('GET:', data);
    } catch (error) {
      console.log('GET error:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // POST
  // =========================

  const postData = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation', 'Name and email are required');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      console.log('POST:', data);

      Alert.alert('Success', 'User created');

      setName('');
      setEmail('');
    } catch (error) {
      console.log('POST error:', error);

      Alert.alert('Error', 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // PUT
  // =========================

  const updateData = async () => {
    if (!userId.trim() || !name.trim() || !email.trim()) {
      Alert.alert(
        'Validation',
        'User ID, name and email are required'
      );

      return;
    }

    setSubmitting(true);

    try {
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

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      console.log('PUT:', data);

      Alert.alert('Success', 'User updated');

      setName('');
      setEmail('');
      setUserId('');
    } catch (error) {
      console.log('PUT error:', error);

      Alert.alert('Error', 'Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteData = async () => {
    if (!userId.trim()) {
      Alert.alert('Validation', 'User ID is required');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      console.log('DELETE:', userId);

      Alert.alert('Success', 'User deleted');

      setUserId('');
    } catch (error) {
      console.log('DELETE error:', error);

      Alert.alert('Error', 'Failed to delete user');
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE CONFIRMATION
  // =========================

  const confirmDelete = () => {
    if (!userId.trim()) {
      Alert.alert('Validation', 'Enter a User ID');
      return;
    }

    Alert.alert(
      'Delete User',
      `Are you sure you want to delete user ${userId}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteData,
        },
      ]
    );
  };

  return (
    <View>
      {/* =========================
          FORM
      ========================= */}

      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter User ID"
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />

      {/* =========================
          BUTTONS
      ========================= */}

      <Button
        title="Display Users"
        onPress={getData}
      />

      <Button
        title={submitting ? 'Creating...' : 'Create User'}
        onPress={postData}
        disabled={submitting}
      />

      <Button
        title={submitting ? 'Updating...' : 'Update User'}
        onPress={updateData}
        disabled={submitting}
      />

      <Button
        title={submitting ? 'Deleting...' : 'Delete User'}
        onPress={confirmDelete}
        disabled={submitting}
      />

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <ActivityIndicator size="large" />
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <View>
          <Text>{error}</Text>

          <Button
            title="Retry"
            onPress={getData}
          />
        </View>
      )}

      {/* =========================
          USERS
      ========================= */}

      <FlatList
        data={users}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View>
            <Text>
              ID: {item.id}
            </Text>

            <Text>
              Name: {item.name}
            </Text>

            <Text>
              Email: {item.email}
            </Text>
          </View>
        )}
        refreshing={loading}
        onRefresh={getData}
        ListEmptyComponent={
          !loading && !error ? (
            <Text>
              No users found
            </Text>
          ) : null
        }
      />
    </View>
  );
}