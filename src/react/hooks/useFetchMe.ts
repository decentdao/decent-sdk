import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../core/types/Api';
import { me } from '../../core/fetch/auth';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

type UseFetchMeResult = QueryReturn<User> & {
  refetch: () => Promise<User | undefined>;
};

/**
 * React hook to fetch the currently authenticated user.
 *
 * @returns {UseFetchMeResult} Object with { data: User, isLoading: boolean, error: Error | null, refetch: Function }
 */
export const useFetchMe = (): UseFetchMeResult => {
  const { apiUrl } = useContext(DecentApiContext);

  const shouldFetch = !!apiUrl;
  if (!shouldFetch) {
    return { data: {} as User, isLoading: false, error: null, refetch: async () => undefined };
  }

  const { data, error, isLoading, refetch: queryRefetch } = useQuery({
    queryKey: ['me', apiUrl],
    queryFn: () => me({ apiUrl }),
    enabled: shouldFetch,
    initialData: {} as User,
  });

  const refetch = async (): Promise<User | undefined> => {
    if (shouldFetch) {
      const result = await queryRefetch();
      return result.data;
    }
    return Promise.resolve(undefined);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
