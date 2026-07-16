//inddividual file for QueryKeys

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api";

// Query Key = Unique Cache ID

export default function QueryKeys() {

  useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return res.json();
    },
  });

  return null;
}