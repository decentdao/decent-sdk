import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { Proposal } from '../../core/types/Proposal';
import { Address } from '../../core/types/Common';
import { getAllProposals } from '../../core/fetch/proposal';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type FetchProposalsParams = {
  chainId?: SupportedChainId;
  address?: Address;
}

/**
 * React hook to fetch all proposals for a specific DAO.
 *
 * @param {FetchProposalsParams} params - Object containing chainId and address.
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Proposal[]>} Object with { data: Proposal[], isLoading: boolean, error: Error | null }
 */
export const useFetchProposals = (params: FetchProposalsParams): QueryReturn<Proposal[]> => {
  const { chainId, address } = params;
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!(chainId && address);
  if (!shouldFetch) {
    return { data: [], isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['proposals', chainId, address, apiUrl],
    queryFn: () => getAllProposals({ chainId, address, apiUrl }),
    enabled: shouldFetch,
    initialData: [],
  });

  return { data, isLoading, error };
};
