import { DashboardSummary } from "@/interfaces/dashboardSummary";
import { apiFetch } from "@/utils/admin-client";


export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiFetch<DashboardSummary>('http://localhost:3000/dashboard/summary');
}
