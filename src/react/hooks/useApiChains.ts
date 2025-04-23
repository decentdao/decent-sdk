import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SupportedChainId } from '../../core/types/Chains';
import { apiChains } from '../../core/fetch/meta';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

/**
 * React hook to fetch the list of supported chains from the API.
 *
 * @returns {QueryReturn<SupportedChainId[]>} Object with { data: SupportedChainId[], loading: boolean, error: Error | null }
 */
export const useApiChains = (): QueryReturn<SupportedChainId[]> => {
  const { apiUrl } = useContext(DecentApiContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['chains', apiUrl],
    queryFn: () => apiChains({ apiUrl }),
    initialData: [],
  });

  return { data, isLoading, error };
};
