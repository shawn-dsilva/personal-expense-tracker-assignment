import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";
// api call
export async function getAuthUser() {
  const res = await fetch(`${API_BASE_URL}/api/auth/user/`, {
    credentials: "include",
  });
  if (res.ok) {
    const data = await res.json();

    return data;
  } 
}

// user query
export function useGetAuthUser() {
  // run the query
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getAuthUser(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
