//Debouncing:It doesn't wait 500ms from when you first started typing. It waits 500ms from your LAST keystroke.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const USERS = [
  { id: "1", name: "John" },
  { id: "2", name: "Alice" },
  { id: "3", name: "David" },
  { id: "4", name: "Emma" },
  { id: "5", name: "Robert" },
];

export default function DebouncedSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // User is typing
    setIsSearching(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search User..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Users Found</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  loadingContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  item: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "gray",
    fontSize: 16,
  },
});


// You type "J"
// ↓
// Timer starts → 500ms

// You type "Jo" before 500ms
// ↓
// Cancel "J" timer
// ↓
// Start new 500ms timer

// You type "Joh" before 500ms
// ↓
// Cancel "Jo" timer
// ↓
// Start new 500ms timer

// You type "John"
// ↓
// Cancel "Joh" timer
// ↓
// Start new 500ms timer

// You STOP typing
// ↓
// Wait 500ms
// ↓
// Update debouncedSearch = "John"


// //-----------

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";

// // Sample users (local data)
// const USERS = [
//   { id: "1", name: "John" },
//   { id: "2", name: "Alice" },
//   { id: "3", name: "David" },
//   { id: "4", name: "Emma" },
//   { id: "5", name: "Robert" },
// ];

// export default function DebouncedSearch() {

//   // Stores the text typed by the user.
//   // Updates immediately on every keystroke.
//   const [search, setSearch] = useState("");

//   // Stores the search value AFTER the user stops typing for 500ms.
//   // We use this value for filtering instead of the immediate search value.
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   // Controls the loading indicator.
//   // true = show Searching...
//   // false = show filtered user list.
//   const [isSearching, setIsSearching] = useState(false);


//   // Runs whenever the 'search' state changes.
//   useEffect(() => {

//     // User has typed something, so show the loading indicator.
//     setIsSearching(true);

//     // Start a 500ms timer.
//     // If the user doesn't type anything else for 500ms,
//     // execute the callback below.
//     const timer = setTimeout(() => {

//       // Update debouncedSearch with the latest search value.
//       // Now we can filter users using this value.
//       setDebouncedSearch(search);

//       // Stop showing the loading indicator.
//       setIsSearching(false);

//     }, 500);


//     // CLEANUP FUNCTION:
//     // Runs before the next useEffect execution when search changes.
//     //
//     // Example:
//     // User types "J"  -> Timer starts.
//     // User types "Jo" -> Previous "J" timer is cancelled.
//     // A new 500ms timer starts for "Jo".
//     //
//     // This ensures the timer waits 500ms AFTER THE LAST KEYSTROKE.
//     return () => clearTimeout(timer);

//   }, [search]); // Re-run useEffect whenever search changes.


//   // Filter users using debouncedSearch.
//   // toLowerCase() makes searching case-insensitive.
//   // includes() checks whether the name contains the search text.
//   const filteredUsers = USERS.filter((user) =>
//     user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
//   );


//   return (
//     <View style={styles.container}>

//       {/* TextInput: Displays and captures the user's search text */}
//       <TextInput
//         placeholder="Search User..."
//         value={search}

//         // Whenever the user types, update search immediately.
//         // This triggers useEffect because search is its dependency.
//         onChangeText={setSearch}

//         style={styles.input}
//       />


//       {/* Conditional rendering using ternary operator */}

//       {isSearching ? (

//         // If isSearching is true, show the loading indicator.
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" />
//           <Text style={styles.loadingText}>Searching...</Text>
//         </View>

//       ) : (

//         // If isSearching is false, display filtered users.
//         <FlatList
//           data={filteredUsers}
//           keyExtractor={(item) => item.id}

//           // Display each user in the list.
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//               <Text>{item.name}</Text>
//             </View>
//           )}

//           // If no matching users are found, display this message.
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>No Users Found</Text>
//           }
//         />

//       )}

//     </View>
//   );
// }


// // Styling
// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     padding: 20,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 20,
//   },

//   loadingContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },

//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//   },

//   item: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },

//   emptyText: {
//     textAlign: "center",
//     marginTop: 30,
//     color: "gray",
//     fontSize: 16,
//   },

// });
