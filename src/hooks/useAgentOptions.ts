import { useEffect, useState } from "react";

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
    fetch("http://localhost:3000/agent?active=false")
      .then((res) => res.json())
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
