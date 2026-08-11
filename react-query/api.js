//Step3

// Get All Posts
export async function getPosts() {
  console.log("Fetching Posts...");
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  
  return response.json();
}

// Create New Post
// export async function createPost(post) {
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(post),
//     }
//   );

//   return response.json();
// }


// Create New Post
export async function createPost(post) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }
  );

  return response.json();
}

//Step 5 in homescreen.jsx