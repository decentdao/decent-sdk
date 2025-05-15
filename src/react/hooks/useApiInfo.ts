import { useContext, useQuery } from './imports';
import { Meta } from '../../core/types/Api';
import { apiInfo } from '../../core/fetch/meta';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DecentApiContext } from '../contexts/DecentApiContext';
import { skipToken } from '@tanstack/react-query';

type ApiInfoParams = TanstackQueryOptions;

/**
 * React hook to fetch API metadata information.
 *
 * @returns {QueryReturn<Meta>} Object with { data: Meta, loading: boolean, error: Error | null }
 */
export const useApiInfo = (params: ApiInfoParams): QueryReturn<Meta> => {
  const { apiUrl } = useContext(DecentApiContext);
  const shouldFetch = params.enabled;
  const { data, error, isLoading } = useQuery({
    queryKey: ['meta', apiUrl],
    queryFn: shouldFetch ? () => apiInfo({ apiUrl }) : skipToken,
    initialData: { name: '', version: '' }
  });

  return { data, isLoading, error };
};
