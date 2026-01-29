import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export function useRecentStays() {
  // For demo: fetch all stays, ignore date and status
  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationalFlag, nationalID)");
      if (error) throw new Error(error.message);
      return data;
    },
  });
  const confirmedStays = stays || [];
  return { isLoading, stays, confirmedStays, numDays: null };
}