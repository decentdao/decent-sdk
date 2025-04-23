import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dao } from '../../core/types/Dao';
import { SupportedChainId } from '../../core/types/Chains';
import { getAllDaos } from '../../core/fetch/dao';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type UseFetchDaosParams = {
  chainId?: SupportedChainId;
};

/**
 * React hook to fetch all DAOs.
 *
 * @param params - Optional parameters to filter DAOs, including chainId, apiUrl and shouldFetch.
 * @returns {QueryReturn<Dao[]>} Object with { data: Dao[], loading: boolean, error: Error | null }
 */
export const useFetchDaos = (params?: UseFetchDaosParams): QueryReturn<Dao[]> => {
  const { chainId } = params ?? {};
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!chainId;
  if (!shouldFetch) {
    return { data: [], isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['daos', chainId, apiUrl],
    queryFn: () => getAllDaos({ chainId, apiUrl }),
    enabled: shouldFetch,
    initialData: [],
  });

  return { data, isLoading, error };
};
