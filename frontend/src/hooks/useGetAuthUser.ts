import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";
// api call
export async function getAuthUser() {
  const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json();

    console.log(data);
    return data;
  } else {
    return null;
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
