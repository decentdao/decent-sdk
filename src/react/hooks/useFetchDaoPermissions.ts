import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Permissions, Address } from '../../core/types/Api';
import { SupportedChainId } from '../../core/types/Chains';
import { getDaoPermissions } from '../../core/fetch/dao';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type UseFetchDaoPermissionsParams = {
  chainId?: SupportedChainId;
  address?: Address;
};

/**
 * React hook to fetch permissions for the current user within a specific DAO.
 *
 * @param {UseFetchDaoPermissionsParams} params - Object containing chainId and address
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Permissions>} Object with { data: Permissions, isLoading: boolean, error: Error | null }
 */
export const useFetchDaoPermissions = (params: UseFetchDaoPermissionsParams): QueryReturn<Permissions> => {
  const { chainId, address } = params;
  const { apiUrl } = useContext(DecentApiContext);
  const shouldFetch = !!(chainId && address);
  if (!shouldFetch) {
    return { data: {} as Permissions, isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['daoPermissions', chainId, address, apiUrl],
    queryFn: async () => {
      const user = await getDaoPermissions({ chainId: chainId!, address: address!, apiUrl });
      return user.permissions as Permissions;
    },
    enabled: shouldFetch,
    initialData: {} as Permissions,
  });

  return { data, isLoading, error };
};
