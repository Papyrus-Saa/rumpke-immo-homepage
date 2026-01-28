import React from "react";

interface LeadMessageCellProps {
  message: string;
  id: string;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  maxLength?: number;
}

export default function LeadMessageCell({ message, id, expanded, setExpanded, maxLength = 30 }: LeadMessageCellProps) {
  const isLong = message.length > maxLength;
  const isExpanded = expanded === id;
  if (!isLong) return <>{message}</>;
  return isExpanded ? (
    <>
      {message}{' '}
      <button
        className="text-primary underline hover:opacity-80 focus:outline-none cursor-pointer"
        onClick={() => setExpanded(null)}
      >
        Weniger anzeigen
      </button>
    </>
  ) : (
    <>
      {message.slice(0, maxLength)}…{' '}
      <button
        className="text-primary underline hover:opacity-80 focus:outline-none cursor-pointer"
        onClick={() => setExpanded(id)}
      >
        Mehr anzeigen
      </button>
    </>
  );
}
