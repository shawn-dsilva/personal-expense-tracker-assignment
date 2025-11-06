import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
// api call
export async function getAllTransactions({ pageParam }) {
  const res = await fetch(
    `${API_BASE_URL}/api/transactions/all/?page=${pageParam}`,
    {
      credentials: "include",
    }
  );
  if (res.ok) {
    const data = await res.json();

    console.log(data);
    return data;
  }
}

// user query
export function useGetPaginatedTransactionsList() {
  // run the query
  return useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return lastPage.next;
      }
      return undefined;
    },
    getPreviousPageParam: (lastPage, allPages) => {
      if (lastPage.previous) {
        return lastPage.previous;
      }
      return undefined;
    },
  });
}
