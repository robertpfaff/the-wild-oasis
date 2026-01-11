import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
    refetch, // add this
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
    console.log("useCabins refetch called");

  return { isLoading, error, cabins, refetch }; // add refetch here
}