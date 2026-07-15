//Step1

// QueryClient.js

import { QueryClient } from "@tanstack/react-query";

// QueryClient manages:
// ✔ Cache
// ✔ API Requests
// ✔ Background Refetch
// ✔ Retry

export const queryClient = new QueryClient();

console.log(queryClient.getQueryData(["posts"]));

//Step2 in app.tsx