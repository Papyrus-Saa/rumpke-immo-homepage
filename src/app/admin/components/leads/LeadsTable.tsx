'use client';

import React, { useState } from "react";
import LeadMessageCell from "./LeadMessageCell";
import LeadStatusSelect from "./LeadStatusSelect";

const initialLeads = [
  {
    id: "b1a2c3d4-5678-1234-9abc-def012345678",
    type: "KONTAKT",
    property: { title: "Schöne zentrale Wohnung" },
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+34123456789",
    message: "Ich interessiere mich für diese Immobilie. Könnten Sie mir bitte weitere Informationen zukommen lassen? Vielen Dank im Voraus! Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen, Juan Pérez. Ich interessiere mich für diese Immobilie. Könnten Sie mir bitte weitere Informationen zukommen lassen? Vielen Dank im Voraus! Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen, Juan Pérez.",
    consent: true,
    status: "NEU",
    created_at: "2026-01-28T10:00:00.000Z",
    updated_at: "2026-01-28T10:00:00.000Z",
    source: "web",
  },
  // ...weitere Leads
];

function statusColor(status: string) {
  switch (status) {
    case "NEU":
      return "text-primary";
    case "IN_BEARBEITUNG":
      return "text-warning";
    case "ABGESCHLOSSEN":
      return "text-success";
    default:
      return "text-admin-text-l dark:text-admin-text-d";
  }
}

export function useLeadStatusCounts() {
  const [mockLeads] = useState(initialLeads);
  const newCount = mockLeads.filter(l => l.status === 'NEU').length;
  const inProgressCount = mockLeads.filter(l => l.status === 'IN_BEARBEITUNG').length;
  return { newCount, inProgressCount };
}

export default function LeadsTable() {
  const [mockLeads, setMockLeads] = useState(initialLeads);
  const [expanded, setExpanded] = useState<string | null>(null);
  const MAX_LENGTH = 30;
  return (
    <div className="bg-bg-l dark:bg-bg-d rounded p-4 shadow-sm border border-admin-border-l dark:border-admin-border-d">
      <h2 className="text-lg font-semibold mb-4 text-admin-text-l dark:text-admin-text-d">Anfragen</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-bg-m dark:bg-bg-d border-b border-border-l dark:border-border-d">
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Typ</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Immobilie</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Name</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">E-Mail</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Telefon</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Nachricht</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Einwilligung</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Status</th>
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Erstellt am</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => {
              const isLong = lead.message.length > MAX_LENGTH;
              const isExpanded = expanded === lead.id;
              return (
                <tr key={lead.id} className="border-b border-border-l dark:border-border-d hover:bg-bg-xl dark:hover:bg-bg-m transition">
                  <td className="p-2 font-medium text-admin-text-l dark:text-admin-text-d">{lead.type}</td>
                  <td className="p-2 text-admin-text-l dark:text-admin-text-d">{lead.property?.title || "-"}</td>
                  <td className="p-2 text-admin-text-l dark:text-admin-text-d">{lead.name}</td>
                  <td className="p-2 text-admin-text-l dark:text-admin-text-d">{lead.email}</td>
                  <td className="p-2 text-admin-text-l dark:text-admin-text-d">{lead.phone}</td>
                  <td className="p-2 text-admin-text-l dark:text-admin-text-d max-w-xs">
                    <LeadMessageCell
                      message={lead.message}
                      id={lead.id}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      maxLength={MAX_LENGTH}
                    />
                  </td>
                  <td className="p-2 text-center">
                    {lead.consent ? (
                      <span className="text-success font-bold">✔</span>
                    ) : (
                      <span className="text-error font-bold">✘</span>
                    )}
                  </td>
                  <td className="p-2 font-semibold">
                    <LeadStatusSelect
                      value={lead.status}
                      onChange={newStatus => setMockLeads(leads => leads.map(l => l.id === lead.id ? { ...l, status: newStatus } : l))}
                    />
                  </td>
                  <td className="p-2 text-admin-text-l dark:text-admin-text-d">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
