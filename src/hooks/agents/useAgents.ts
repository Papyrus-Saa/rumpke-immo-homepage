import { useQuery, useMutation } from "@tanstack/react-query";
import { getAgents, deleteAgent as apiDeleteAgent, editAgent as apiEditAgent } from "@/utils/admin-client";

export interface Agent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url?: string;
  position_de?: string;
  languages?: string[];
  is_active: boolean;
}



export function useAgents(initialAgents: Agent[] = []) {
  const {
    data: agents = [],
    isLoading: loading,
    error,
    refetch: fetchAgents,
  } = useQuery<Agent[], Error>({
    queryKey: ["agents"],
    queryFn: getAgents,
    initialData: initialAgents,
  });


  const editMutation = useMutation({
    mutationFn: apiEditAgent,
    onSuccess: () => {
      fetchAgents();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: apiDeleteAgent,
    onSuccess: () => {
      fetchAgents();
    },
  });

  return {
    agents,
    loading,
    error,
    fetchAgents,
    editAgent: editMutation.mutate,
    editAgentStatus: editMutation.status,
    deleteAgent: deleteMutation.mutate,
    deleteAgentStatus: deleteMutation.status,
  };
}
