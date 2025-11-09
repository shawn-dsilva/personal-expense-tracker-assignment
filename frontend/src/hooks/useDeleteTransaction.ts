import { useQueryClient, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../constant";

const deleteTransaction = async (transactionId: number) => {
      const response = await fetch(`${API_BASE_URL}/api/transactions/delete/${transactionId}/`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      return true;
    };

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
        mutationFn: async (transactionId: number) => deleteTransaction(transactionId),
        onSuccess: () => {
          // Invalidate the relevant query to refetch the data after deletion
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error) => {
          console.error("Error deleting transaction:", error);
        },
      });
}
