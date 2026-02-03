'use client';
import { IoSadOutline } from 'react-icons/io5';
import React, { useState, useEffect } from "react";
import { getLeads, updateLeadStatus } from '@/utils/admin-client';
import LeadMessageCell from "./LeadMessageCell";
import LeadStatusSelect from "./LeadStatusSelect";



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


export default function LeadsTable() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const MAX_LENGTH = 30;

  const typeMap: Record<string, string> = {
    CONTACT: 'Kontakt',
    VALUATION: 'Bewertung',
    VISIT_REQUEST: 'Besichtigung',
    KONTAKT: 'Kontakt',
    BEWERTUNG: 'Bewertung',
    BESICHTIGUNG: 'Besichtigung',
  };

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      setError("");
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err: any) {
        setError(err.message || "Fehler beim Laden der Leads");
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
    window.addEventListener('lead:created', fetchLeads);
    return () => window.removeEventListener('lead:created', fetchLeads);
  }, []);

  if (loading) return <div className="text-center py-8 text-admin-text-l dark:text-admin-text-d">Lade Anfragen...</div>;
  if (error) return <div className="text-center py-8 text-error">{error}</div>;
  if (!leads.length) {
    return (
      <div className="bg-bg-l dark:bg-bg-d rounded p-4 shadow-sm border border-admin-border-l dark:border-admin-border-d">
        <h2 className="text-lg font-semibold mb-4 text-admin-text-l dark:text-admin-text-d">Anfragen</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <IoSadOutline className="text-5xl text-gray-400 mb-4" />
          <div className="text-center text-xl text-gray-500 dark:text-gray-300">Zurzeit gibt es keine Anfragen.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-l dark:bg-bg-d rounded p-4 shadow-sm border border-admin-border-l dark:border-admin-border-d">
      <h2 className="text-lg font-semibold mb-4 text-admin-text-l dark:text-admin-text-d">Anfragen</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-bg-m dark:bg-bg-d border-b border-border-l dark:border-border-d">
              <th className="p-2 text-left text-admin-text-l dark:text-admin-text-d">Thema</th>
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
            {leads.map((lead) => {
              const isLong = lead.message.length > MAX_LENGTH;
              const isExpanded = expanded === lead.id;
              return (
                <tr key={lead.id} className="border-b border-border-l dark:border-border-d hover:bg-bg-xl dark:hover:bg-bg-m transition">
                  <td className="p-2 font-medium text-admin-text-l dark:text-admin-text-d">{typeMap[lead.type] || lead.type}</td>
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
                      value={
                        lead.status === "NEU" ? "NEW" :
                          lead.status === "IN_BEARBEITUNG" ? "IN_PROGRESS" :
                            lead.status === "ABGESCHLOSSEN" ? "DONE" :
                              lead.status
                      }
                      onChange={async newStatus => {
                        const backendStatus = newStatus;
                        setLeads(leads => leads.map(l => l.id === lead.id ? { ...l, status: backendStatus } : l));
                        try {
                          await updateLeadStatus(lead.id, backendStatus);
                          window.dispatchEvent(new Event('lead:updated'));
                        } catch (err) {
                          setLeads(leads => leads.map(l => l.id === lead.id ? { ...l, status: lead.status } : l));
                          alert('Fehler beim Aktualisieren des Status.');
                        }
                      }}
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
