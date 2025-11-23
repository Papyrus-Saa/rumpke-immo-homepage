
'use client';
import { useEffect, useState } from 'react';
import { getAgents } from '@/utils/admin-client';
import AgentsTableClient from './components/AgentsTableClient';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAgents();
        setAgents(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e.message || 'Error fetching agents');
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  if (loading) return <div className="p-6">Loading agents...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return <AgentsTableClient initialAgents={agents} />;
}
