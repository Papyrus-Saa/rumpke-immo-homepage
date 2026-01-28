import { useState } from "react";


const initialLeads = [
  { status: "NEU" },
  { status: "IN_BEARBEITUNG" },
  { status: "ABGESCHLOSSEN" },
  { status: "NEU" },
  { status: "NEU" },
];

export function useLeadStatusCounts() {

  const [mockLeads] = useState(initialLeads);
  const newCount = mockLeads.filter(l => l.status === 'NEU').length;
  const inProgressCount = mockLeads.filter(l => l.status === 'IN_BEARBEITUNG').length;
  return { newCount, inProgressCount };
}
