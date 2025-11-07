import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
// api call
export async function getAllTransactions(currentPage:number, category:string) {
   const res = await fetch(`${API_BASE_URL}/api/transactions/all/?page=${currentPage}&category=${category}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
  
      console.log(data);
      return data;
    } 
}

// user query
export function useGetPaginatedTransactions(currentPage:number, category:string) {
  // run the query
  return useQuery({
    queryKey: ["transactions", currentPage, category],
    queryFn: () => getAllTransactions(currentPage, category),
    placeholderData: (prev) => prev
  });
}
