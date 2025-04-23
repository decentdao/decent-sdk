import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
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
 * @param params - Parameters to fetch proposals, including chainId, address, apiUrl and shouldFetch.
 *                 The hook will only fetch if both chainId and address are provided and shouldFetch is true.
 * @returns {QueryReturn<Proposal[]>} Object with { data: Proposal[], loading: boolean, error: Error | null }
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
