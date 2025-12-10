import { getDashboardSummary } from "@/app/admin/dashboard/services/dashboardApi";
import { DashboardSummary } from "@/interfaces/dashboardSummary";
import { useQuery } from "@tanstack/react-query";




export function useDashboardSummary() {
  return useQuery<DashboardSummary, Error>({
    queryKey: ['dashboardSummary'],
    queryFn: getDashboardSummary,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
