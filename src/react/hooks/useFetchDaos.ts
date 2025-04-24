import { useContext, useQuery } from './imports';
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
 * @param {UseFetchDaosParams} params - Optional parameters to filter DAOs by chainId.
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @returns {QueryReturn<Dao[]>} Object with { data: Dao[], isLoading: boolean, error: Error | null }
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
