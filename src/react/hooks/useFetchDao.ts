import { useContext, useQuery } from './imports';
import { Dao } from '../../core/types/Dao';
import { Address } from '../../core/types/Common';
import { SupportedChainId } from '../../core/types/Chains';
import { getDao } from '../../core/fetch/dao';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type FetchDaoParams = {
  chainId?: SupportedChainId;
  address?: Address;
};

/**
 * React hook to fetch a specific DAO.
 *
 * @param {FetchDaoParams} params - Object containing chainId and address
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Dao>} Object with { data: Dao, isLoading: boolean, error: Error | null }
 */
export const useFetchDao = (params: FetchDaoParams): QueryReturn<Dao> => {
  const { chainId, address } = params;
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!(chainId && address);
  if (!shouldFetch) {
    return { data: {} as Dao, isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['dao', chainId, address, apiUrl],
    queryFn: () => getDao({ chainId, address, apiUrl }),
    enabled: shouldFetch,
    initialData: {} as Dao,
  });

  return { data, isLoading, error };
};
