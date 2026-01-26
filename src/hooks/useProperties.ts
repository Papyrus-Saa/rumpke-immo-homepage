import { useQuery } from '@tanstack/react-query';

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/property', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al cargar propiedades');
      return res.json();
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}
