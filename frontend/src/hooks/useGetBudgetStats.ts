import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constant";
// api call
export async function getBudgetStats(month) {
   const res = await fetch(`${API_BASE_URL}/api/budgets/stats/${month}/`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
  
      console.log(data);
      return data;
    } 
}

// user query
export function useGetBudgetStats(month) {
  // run the query
  return useQuery({
    queryKey: ["budgetStats"],
    queryFn: () => getBudgetStats(month),
  });
}
