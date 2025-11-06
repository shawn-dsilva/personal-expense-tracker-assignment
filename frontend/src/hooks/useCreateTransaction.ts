import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";
import { Transaction } from "@/types";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Transaction) => {
        console.log(data)
      const res = await fetch(`${API_BASE_URL}/api/transactions/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();

        console.log(data);
        return data;
      } else {
         const text = await res.json();
         console.log(text);
         throw new Error(text.detail);
      }
    },
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(["transactions"], (prevTransactions:Transaction[]) => [
        newTransaction, 
        ...prevTransactions
    ]);
    },
  });
}
