import { useEffect, useState } from "react";
import { getAgents } from "@/utils/admin-client";

export interface AgentOption {
  id: string;
  name: string;
}

export function useAgentOptions() {
  const [options, setOptions] = useState<AgentOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAgents()
      .then((data) => {
        setOptions(
          data.map((agent: any) => ({
            id: agent.id,
            name: `${agent.first_name} ${agent.last_name}`,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError("Fehler beim Laden der Makler");
        setLoading(false);
      });
  }, []);

  return { options, loading, error };
}
