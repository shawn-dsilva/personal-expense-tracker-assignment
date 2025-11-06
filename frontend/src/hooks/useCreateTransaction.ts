import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

interface User {
  first_name?: string;
  last_name?: string;
  username?: string;
}
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
        console.log(data)
      const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
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
    onSuccess: (user) => {
      const { username, first_name, last_name } = user as User;
      queryClient.setQueryData(["user"], { username, first_name, last_name });
      navigate("/dashboard");
    },
  });
}
