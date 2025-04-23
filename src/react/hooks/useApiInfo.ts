import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Meta } from '../../core/types/Api';
import { apiInfo } from '../../core/fetch/meta';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

/**
 * React hook to fetch API metadata information.
 *
 * @returns {QueryReturn<Meta>} Object with { data: Meta, loading: boolean, error: Error | null }
 */
export const useApiInfo = (): QueryReturn<Meta> => {
  const { apiUrl } = useContext(DecentApiContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ['meta', apiUrl],
    queryFn: () => apiInfo({ apiUrl }),
    initialData: { name: '', version: '' },
  });

  return { data, isLoading, error };
};
