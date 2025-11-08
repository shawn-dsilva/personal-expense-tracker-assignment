import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
import { TransactionFilters } from "@/types";
import dayjs from "dayjs";
// api call
export async function getAllTransactions(currentPage:number, filters:TransactionFilters) {
    const { category, dateRange, amounts } = filters || {};
    
    let url = `${API_BASE_URL}/api/transactions/all/?page=${currentPage}`;

    if (category) {
      url += `&category=${category}`;
    }

    for(const key in dateRange){
        if(dateRange[key]){
            url += `&date_${key}=${dayjs(dateRange[key]).toISOString()}`
        }
    }

    for(const key in amounts){
        if(amounts[key]){
            url += `&amount_${key}=${amounts[key]}`
        }
    }

   const res = await fetch(url, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
  
      console.log(data);
      return data;
    } 
}

// user query
export function useGetPaginatedTransactions(currentPage:number, filters:TransactionFilters) {
  // run the query
  return useQuery({
    queryKey: ["transactions", currentPage],
    queryFn: () => getAllTransactions(currentPage, filters),
    placeholderData: (prev) => prev
  });
}
