import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { Comment } from '../../core/types/Discussion';
import { Address } from '../../core/types/Common';
import { getAllComments } from '../../core/fetch/comment';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type FetchCommentsParams = {
  chainId?: SupportedChainId;
  address?: Address;
  slug?: string;
};

/**
 * React hook to fetch all comments for a specific proposal.
 *
 * @param {FetchCommentsParams} params - Object containing chainId, address, and slug.
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the proposal
 * @param {string} params.slug - Unique identifier for the specific proposal
 * @returns {QueryReturn<Comment[]>} Object with { data: Comment[], isLoading: boolean, error: Error | null }
 */
export const useFetchComments = (params: FetchCommentsParams): QueryReturn<Comment[]> => {
  const { chainId, address, slug } = params;
  const { apiUrl } = useContext(DecentApiContext);
  const shouldFetch = !!(chainId && address && slug);
  if (!shouldFetch) {
    return { data: [], isLoading: false, error: null };
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ['comments', chainId, address, slug, apiUrl],
    queryFn: () => getAllComments({ chainId, address, slug, apiUrl }),
    enabled: shouldFetch,
    initialData: [],
  });

  return { data, isLoading, error };
};
