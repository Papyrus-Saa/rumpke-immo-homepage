import React from "react";

interface LeadStatusSelectProps {
  value: string;
  onChange: (newStatus: string) => void;
}

const STATUS_OPTIONS = [
  { value: "NEU", label: "Neu", color: "text-primary" },
  { value: "IN_BEARBEITUNG", label: "In Bearbeitung", color: "text-warning" },
  { value: "ABGESCHLOSSEN", label: "Abgeschlossen", color: "text-success" },
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

export default function LeadStatusSelect({ value, onChange }: LeadStatusSelectProps) {
  return (
    <select
      className={`bg-bg-l dark:bg-bg-d border border-border-l dark:border-border-d rounded px-2 py-1 focus:outline-none ${statusColor(value)}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {STATUS_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value} className={opt.color}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
