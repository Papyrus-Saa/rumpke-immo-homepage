import { Agent } from "@/interfaces/agent-interface";


interface AgentCardProps {
  agent: Agent;
}


export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  if (!agent) return null;

  const languageCodes = [
    'de','en','es','pt','fr','it','nl','pl','ru','ar','zh','ja','tr','hi'
  ];

  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white dark:bg-neutral-900 p-6 flex flex-col items-center">
      <img
        src={agent.photo_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(agent.first_name + ' ' + agent.last_name)}
        alt={agent.first_name + ' ' + agent.last_name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
      />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {agent.first_name} {agent.last_name}
      </h2>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {agent.position_de || agent.position_en || agent.position_es || 'No position'}
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {agent.languages?.map((lang: string) => (
          <span key={lang} className="px-2 py-1 text-xs bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded">
            {lang}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-900 dark:text-white mb-1">{agent.email}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{agent.phone}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{agent.mobile}</div>
      <div className="mb-2">
        <span className={`px-2 py-1 text-xs font-medium rounded ${agent.is_active ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-300'}`}>
          {agent.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="w-full mt-2">
        {languageCodes.map((code: string) => {
          const bio = agent[`bio_${code}` as keyof Agent] as string | undefined;
          return bio ? (
            <div key={code} className="mb-2">
              <span className="font-semibold uppercase text-xs">{code}:</span>
              <span className="ml-2 text-xs text-gray-700 dark:text-gray-300">{bio}</span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};
