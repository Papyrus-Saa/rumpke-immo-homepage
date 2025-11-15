import { useState, useEffect } from 'react';

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

const API_URL = 'http://localhost:3000';

export function useAgents(initialAgents: Agent[] = []) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const [deleteAgent, setDeleteAgent] = useState<Agent | null>(null);

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/agent?active=false`);
      if (!res.ok) throw new Error('Failed to fetch agents');
      const data = await res.json();
      setAgents(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e.message || 'Error fetching agents');
    } finally {
      setLoading(false);
    }
  };

  const deleteAgentById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/agent/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete agent');
      setAgents(prev => prev.filter(a => a.id !== id));
      setDeleteAgent(null);
    } catch (e: any) {
      setError(e.message || 'Error deleting agent');
    } finally {
      setLoading(false);
    }
  };

  const updateAgent = async (agent: Agent) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('admin_token');
      const { id, created_at, updated_at, ...allowedFields } = agent as any;
      const res = await fetch(`${API_URL}/agent/${agent.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(allowedFields),
      });
      if (!res.ok) throw new Error('Failed to update agent');
      const updated = await res.json();
      setAgents(prev => prev.map(a => a.id === agent.id ? updated : a));
      setEditAgent(null);
    } catch (e: any) {
      setError(e.message || 'Error updating agent');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialAgents.length) fetchAgents();
    // eslint-disable-next-line
  }, []);

  return {
    agents,
    loading,
    error,
    editAgent,
    setEditAgent,
    deleteAgent,
    setDeleteAgent,
    fetchAgents,
    deleteAgentById,
    updateAgent,
  };
}
