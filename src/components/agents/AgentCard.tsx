import Image from 'next/image';
import { Agent } from '@/interfaces/agent-interface';
import { IoMailOutline, IoCallOutline, IoPhonePortraitOutline } from 'react-icons/io5';

interface AgentCardProps {
  agent: Agent;
  locale: 'de' | 'en' | 'es';
}

export const AgentCard = ({ agent, locale }: AgentCardProps) => {
  const position = agent[`position_${locale}`] || agent.position_de;
  const bio = agent[`bio_${locale}`] || agent.bio_de;
  const fullName = `${agent.first_name} ${agent.last_name}`;

  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d rounded shadow-lg p-4 md:p-6  dark:shadow-primary-dark">

      <div className="flex items-start gap-4 mb-4">

        {agent.photo_url && (
          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
            <Image
              src={agent.photo_url}
              alt={fullName}
              fill
              className="object-cover rounded-full"
              sizes="80px"
            />
          </div>
        )}


        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">
            {fullName}
          </h3>
          {position && (
            <p className="text-xs md:text-sm text-primary font-medium line-clamp-2">
              {position}
            </p>
          )}
        </div>
      </div>


      <div className="space-y-4">

        {bio && (
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {bio}
          </p>
        )}

        {agent.languages && agent.languages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {agent.languages.map((lang) => (
              <span
                key={lang}
                className="px-2 md:px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded"
              >
                {lang === 'Deutsch' && '🇩🇪 Deutsch'}
                {lang === 'English' && '🇬🇧 English'}
                {lang === 'Español' && '🇪🇸 Español'}
                {lang === 'Português' && '🇵🇹 Português'}
                {!['Deutsch', 'English', 'Español', 'Português'].includes(lang) && lang}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <IoMailOutline className="text-lg md:text-xl shrink-0" />
            <a href={`mailto:${agent.email}`} className="hover:text-primary transition-colors truncate">
              {agent.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <IoCallOutline className="text-lg md:text-xl shrink-0" />
            <a href={`tel:${agent.phone}`} className="hover:text-primary transition-colors">
              {agent.phone}
            </a>
          </div>
          {agent.mobile && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <IoPhonePortraitOutline className="text-lg md:text-xl shrink-0" />
              <a href={`tel:${agent.mobile}`} className="hover:text-primary transition-colors">
                {agent.mobile}
              </a>
            </div>
          )}
        </div>


        <button className="w-full mt-4 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary hover:bg-primary/90 text-white font-medium rounded transition-colors cursor-pointer">
          Kontakt aufnehmen
        </button>
      </div>
    </div>
  );
};


