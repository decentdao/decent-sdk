import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { Proposal } from '../../core/types/Proposal';
import { Address } from '../../core/types/Common';
import { getProposal } from '../../core/fetch/proposal';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type FetchProposalParams = {
  chainId?: SupportedChainId;
  address?: Address;
  slug?: string;
};

/**
 * React hook to fetch a specific proposal by its slug.
 *
 * @param {FetchProposalParams} params - Object containing chainId, address, and slug.
 * @param {SupportedChainId} params.chainId - The chain ID of the blockchain
 * @param {Address} params.address - The contract address of the proposal
 * @param {string} params.slug - Unique identifier for the specific proposal
 * @returns {QueryReturn<Proposal>} Object with { data: Proposal, isLoading: boolean, error: Error | null }
 */
export const useFetchProposal = (params: FetchProposalParams): QueryReturn<Proposal> => {
  const { chainId, address, slug } = params;
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!(chainId && address && slug);
  if (!shouldFetch) {
    return { data: {} as Proposal, isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['proposal', chainId, address, slug, apiUrl],
    queryFn: () => getProposal({ chainId, address, slug, apiUrl }),
    enabled: shouldFetch,
    initialData: {} as Proposal,
  });

  return { data, isLoading, error };
};
