import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
// api call
export async function getAllTransactions({ pageParam = 2 }) {
  const res = await fetch(
    `${API_BASE_URL}/api/transactions/all/?limit=2&offset=${pageParam}`,
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
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return lastPage.next;
      }
      return undefined;
    },
  });
}
