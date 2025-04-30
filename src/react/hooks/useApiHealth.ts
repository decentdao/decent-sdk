import { useContext, useQuery } from './imports';
import { Health } from '../../core/types/Api';
import { apiHealth } from '../../core/fetch/meta';
import { QueryReturn } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';

/**
 * React hook to fetch API health status.
 *
 * @returns {QueryReturn<Health>} Object with { data: Health, loading: boolean, error: Error | null }
 */
export const useApiHealth = (): QueryReturn<Health> => {
  const { apiUrl } = useContext(DecentApiContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ['health', apiUrl],
    queryFn: () => apiHealth({ apiUrl }),
    initialData: '',
  });

  return { data, isLoading, error };
};
