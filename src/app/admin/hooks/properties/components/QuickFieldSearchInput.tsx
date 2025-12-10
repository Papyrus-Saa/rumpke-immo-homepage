import React from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';

interface QuickFieldSearchInputProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Array<{ key: string; label: string }>;
  scrollToField: (key: string) => void;
  setSearchResults: (results: Array<{ key: string; label: string }>) => void;
}

const QuickFieldSearchInput: React.FC<QuickFieldSearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  scrollToField,
  setSearchResults,
}) => {
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchResults.length > 0) {
      scrollToField(searchResults[0].key);
    }
  };

  return (
    <div className="mb-6 relative">
      <form className="relative flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Feld schnell finden (z.B. Abstellraum, Preis, Adresse...)"
          className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-card-secondary-bg-l text-admin-text-l border border-admin-border-l placeholder:text-gray-400 dark:bg-card-secondary-bg-d dark:text-admin-text-d dark:border-admin-border-d dark:placeholder:text-gray-300"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
            className="ml-2 h-10 w-10 flex items-center justify-center rounded bg-card-secondary-bg-l border border-admin-border-l text-admin-text-l hover:bg-Bghover-l dark:bg-card-secondary-bg-d dark:text-admin-text-d dark:border-admin-border-d dark:hover:bg-Bghover-d cursor-pointer"
            tabIndex={-1}
            aria-label="Feld löschen"
          >
            <IoClose size={24} className="cursor-pointer" />
          </button>
        )}
        <button
          type="submit"
          className="ml-2 h-10 w-10 flex items-center justify-center rounded bg-card-secondary-bg-l border border-admin-border-l text-admin-text-l hover:bg-Bghover-l dark:bg-card-secondary-bg-d dark:text-admin-text-d dark:border-admin-border-d dark:hover:bg-Bghover-d cursor-pointer"
          aria-label="Suche"
        >
          <IoSearch size={24} className=" cursor-pointer" />
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto bg-white text-admin-text-l border border-admin-border-l dark:bg-[#23272F] dark:text-admin-text-d dark:border-admin-border-d">
          {searchResults.map(result => (
            <button
              key={result.key}
              type="button"
              onClick={() => scrollToField(result.key)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-Bghover-l dark:hover:bg-[#2C313A] border-b border-admin-border-l dark:border-admin-border-d last:border-b-0 cursor-pointer transition-colors duration-150 ${searchQuery === result.label ? ' outline-2 outline-orange-600' : ''}`}
            >
              {result.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickFieldSearchInput;
