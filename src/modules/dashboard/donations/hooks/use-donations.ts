import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteDonation,
  getDonationsPaginated,
} from "../server/donation.action";

const LIMIT = 10;

export function useDonations() {
  return useInfiniteQuery({
    queryKey: ["donations"],
    queryFn: async ({ pageParam = 0 }) =>
      getDonationsPaginated(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT ? allPages.length * LIMIT : undefined,
  });
}

export function useDeleteDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDonation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}
