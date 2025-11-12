import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string }) => {
      const res = await fetch(`${API_BASE_URL}/api/budgets/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();

        return data;
      } else {
         const text = await res.json();
         throw new Error(text.detail);
      }
    },
    onSuccess: (newBudget) => {
      queryClient.setQueryData(["budget"], newBudget);
    },
  });
}
