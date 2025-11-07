import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
// api call
export async function getAllTransactions(currentPage:number) {
   const res = await fetch(`${API_BASE_URL}/api/transactions/all/?page=${currentPage}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
  
      console.log(data);
      return data;
    } 
}

// user query
export function useGetPaginatedTransactions(currentPage:number) {
  // run the query
  return useQuery({
    queryKey: ["transactions", currentPage],
    queryFn: () => getAllTransactions(currentPage),
    placeholderData: (prev) => prev
  });
}
