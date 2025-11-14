
import AgentsTableClient from './components/AgentsTableClient';

async function getAgents() {
  try {
    const res = await fetch('http://localhost:3000/agent', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch agents');
    return res.json();
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export default async function AgentsPage() {
  const agents = await getAgents();
  return <AgentsTableClient initialAgents={agents} />;
}
