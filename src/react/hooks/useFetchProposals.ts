import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { Proposal } from '../../core/types/Proposal';
import { Address } from '../../core/types/Api';
import { getAllProposals } from '../../core/fetch/proposal';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type UseFetchProposalsParams = {
  chainId?: SupportedChainId;
  address?: Address;
}

/**
 * React hook to fetch all proposals for a specific DAO.
 *
 * @param {UseFetchProposalsParams} params - Object containing chainId and address.
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Proposal[]>} Object with { data: Proposal[], isLoading: boolean, error: Error | null }
 */
export const useFetchProposals = (params: UseFetchProposalsParams): QueryReturn<Proposal[]> => {
  const { chainId, address } = params;
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!(chainId && address);
  if (!shouldFetch) {
    return { data: [], isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['proposals', chainId, address, apiUrl],
    queryFn: () => getAllProposals({ chainId: chainId!, address: address!, apiUrl }),
    enabled: shouldFetch,
    initialData: [],
  });

  return { data, isLoading, error };
};
