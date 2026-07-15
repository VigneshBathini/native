import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";

export default function App() {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const url = "https://jsonplaceholder.typicode.com/users";

  const getUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    await getUsers();

    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Username: {item.username}</Text>
      <Text>Email: {item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

//

// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   View,
//   Text,
//   RefreshControl,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";

// export default function App() {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const getPosts = async (pageNumber) => {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
//     );

//     const data = await response.json();

//     if (pageNumber === 1) {
//       setPosts(data);
//     } else {
//       setPosts((prev) => [...prev, ...data]);
//     }

//     setLoadingMore(false);
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     getPosts(page);
//   }, [page]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setPage(1);
//   };

//   const loadMore = () => {
//     if (loadingMore || refreshing) return;

//     setLoadingMore(true);
//     setPage((prev) => prev + 1);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.body}>{item.body}</Text>
//     </View>
//   );

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem}
//       onEndReached={loadMore}
//       onEndReachedThreshold={0.5}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//         />
//       }
//       ListFooterComponent={
//         loadingMore ? (
//           <View style={{ padding: 20 }}>
//             <ActivityIndicator size="large" />
//           </View>
//         ) : null
//       }
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     margin: 10,
//     padding: 15,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textTransform: "capitalize",
//   },
//   body: {
//     fontSize: 15,
//     lineHeight: 22,
//     color: "#555",
//   },
// });