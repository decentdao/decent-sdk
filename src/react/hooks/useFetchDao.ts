import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dao } from '../../core/types/Dao';
import { Address } from '../../core/types/Api';
import { SupportedChainId } from '../../core/types/Chains';
import { getDao } from '../../core/fetch/dao';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type UseFetchDaoParams = {
  chainId?: SupportedChainId;
  address?: Address;
};

/**
 * React hook to fetch a specific DAO.
 *
 * @param params - Parameters to fetch the DAO, including chainId, address.
 *                 The hook will only fetch if both chainId and address are provided.
 * @returns {QueryReturn<Dao>} Object with { data: Dao, loading: boolean, error: Error | null }
 */
export const useFetchDao = (params: UseFetchDaoParams): QueryReturn<Dao> => {
  const { chainId, address } = params;
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!(chainId && address);
  if (!shouldFetch) {
    return { data: {} as Dao, isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['dao', chainId, address, apiUrl],
    queryFn: () => getDao({ chainId: chainId!, address: address!, apiUrl }),
    enabled: shouldFetch,
    initialData: {} as Dao,
  });

  return { data, isLoading, error };
};
