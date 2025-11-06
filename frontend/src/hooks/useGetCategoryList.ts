import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
// api call
export async function getAllCategories() {
   const res = await fetch(`${API_BASE_URL}/api/categories/all/`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
  
      console.log(data);
      return data;
    } 
}

// user query
export function useGetAllCategories() {
  // run the query
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
}
