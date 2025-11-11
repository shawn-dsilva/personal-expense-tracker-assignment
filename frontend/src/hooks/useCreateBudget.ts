import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string }) => {
        console.log(data)
      const res = await fetch(`${API_BASE_URL}/api/budgets/add/`, {
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
    onSuccess: (newBudget) => {
      queryClient.setQueryData(["budget"], newBudget);
    },
  });
}
