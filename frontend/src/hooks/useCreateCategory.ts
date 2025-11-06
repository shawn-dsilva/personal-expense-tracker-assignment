import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";
import { Transaction } from "@/types";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string }) => {
        console.log(data)
      const res = await fetch(`${API_BASE_URL}/api/categories/add/`, {
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
    onSuccess: (newCategory) => {
      queryClient.setQueryData(["categories"], (prevCategories) => [
        newCategory,
        ...prevCategories
      ]);
    },
  });
}
