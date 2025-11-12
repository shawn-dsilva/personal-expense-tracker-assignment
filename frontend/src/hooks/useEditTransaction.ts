import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";
import { Transaction } from "@/types";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Transaction) => {
      const res = await fetch(
        `${API_BASE_URL}/api/transactions/update/${data.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        const text = await res.json();
        throw new Error(text.detail);
      }
    },
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(
        ["transactions", 1],
        (prevTransactions: { results: Transaction[] }) => ({
          ...prevTransactions,
          results: [newTransaction, ...prevTransactions.results],
        })
      );
    },
  });
}
