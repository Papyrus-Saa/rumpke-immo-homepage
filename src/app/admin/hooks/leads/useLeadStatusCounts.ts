import { useEffect, useState } from 'react';
import { getLeads } from '@/utils/admin-client';

export function useLeadStatusCounts() {
  const [newCount, setNewCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const leads = await getLeads();
        setNewCount(leads.filter((l: any) => l.status === 'NEW').length);
        setInProgressCount(leads.filter((l: any) => l.status === 'IN_BEARBEITUNG').length);
      } catch {
        setNewCount(0);
        setInProgressCount(0);
      }
    }
    fetchCounts();
    window.addEventListener('lead:created', fetchCounts);
    window.addEventListener('lead:updated', fetchCounts);
    return () => {
      window.removeEventListener('lead:created', fetchCounts);
      window.removeEventListener('lead:updated', fetchCounts);
    };
  }, []);

  return { newCount, inProgressCount };
}
