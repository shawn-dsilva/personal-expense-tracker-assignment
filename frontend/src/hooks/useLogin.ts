import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";

interface User {
  first_name?: string;
  last_name?: string;
  username?: string;
}
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const data = await res.json();

        console.log(data);
        return data;
      } else {
        return null;
      }
    },
    onSuccess: (user) => {
      const { username, first_name, last_name } = user as User;
      queryClient.setQueryData(["user"], { username, first_name, last_name });
    },
  });
}
