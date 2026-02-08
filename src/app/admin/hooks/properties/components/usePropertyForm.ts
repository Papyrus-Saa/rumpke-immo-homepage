import { useState, useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

export interface UsePropertyFormOptions {
  allFields: Array<{ key: string; label: string }>;
  errors: FieldErrors<any>;
}

export function usePropertyForm({ allFields, errors }: UsePropertyFormOptions) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ key: string; label: string }>>([]);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);


  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = allFields.filter(
      (field) =>
        field.label.toLowerCase().includes(query) ||
        field.key.toLowerCase().includes(query)
    );
    setSearchResults(filtered.slice(0, 5));
  }, [searchQuery, allFields]);

  const scrollToField = (fieldKey: string) => {
    const element = document.getElementsByName(fieldKey)[0] ||
      document.querySelector(`[name="${fieldKey}"]`) as HTMLElement;
    if (element) {
      setHighlightedField(fieldKey);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
      setTimeout(() => {
        setHighlightedField(null);
      }, 3000);
    }
    setSearchQuery('');
    setSearchResults([]);
  };


  const getInputClassName = (fieldName: string) => {
    const baseClasses = "w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent";
    return highlightedField === fieldName ? `${baseClasses} ring-2 ring-warning` : baseClasses;
  };


  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  }, [errors]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    highlightedField,
    setHighlightedField,
    scrollToField,
    getInputClassName,
  };
}
