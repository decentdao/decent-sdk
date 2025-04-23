import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SupportedChainId } from '../../core/types/Chains';
import { Proposal } from '../../core/types/Proposal';
import { Address } from '../../core/types/Api';
import { getProposal } from '../../core/fetch/proposal';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type UseFetchProposalParams = {
  chainId?: SupportedChainId;
  address?: Address;
  slug?: string;
};

/**
 * React hook to fetch a specific proposal by its slug.
 *
 * @param params - Parameters to fetch the proposal, including chainId, address, slug.
 *                 The hook will only fetch if chainId, address, and slug are provided.
 * @returns {QueryReturn<Proposal>} Object with { data: Proposal, loading: boolean, error: Error | null }
 */
export const useFetchProposal = (params: UseFetchProposalParams): QueryReturn<Proposal> => {
  const { chainId, address, slug } = params;
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!(chainId && address && slug);
  if (!shouldFetch) {
    return { data: {} as Proposal, isLoading: false, error: null };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['proposal', chainId, address, slug, apiUrl],
    queryFn: () => getProposal({ chainId: chainId!, address: address!, slug: slug!, apiUrl }),
    enabled: shouldFetch,
    initialData: {} as Proposal,
  });

  return { data, isLoading, error };
};
