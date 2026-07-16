
// step2
 
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./react-query/QueryClient"; 

import HomeScreen from "./react-query/Homescreen";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}


// Usually in:
// App.tsx
// or
// app/_layout.tsx   // Expo Router

// step3 in api.js