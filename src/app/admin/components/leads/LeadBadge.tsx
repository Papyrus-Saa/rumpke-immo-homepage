

interface LeadBadgeProps {
  newCount: number;
}

export default function LeadBadge({ newCount }: LeadBadgeProps) {
  if (newCount === 0) return null;
  return (
    <span
      className="ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold bg-success text-white"
      style={{ minWidth: 22 }}
    >
      {newCount}
    </span>
  );
}
