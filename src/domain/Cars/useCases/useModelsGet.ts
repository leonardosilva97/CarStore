import { useInfiniteQuery } from '@tanstack/react-query';
import { carsService } from '../carsService';
import { PaginatedModels, GetModelsRequest } from '../carsTypes';

export function useModelsGet(brandCode: string) {
  const query = useInfiniteQuery<PaginatedModels, Error>({
    queryKey: ['models', brandCode],
    queryFn: ({ pageParam = 1 }) => 
      carsService.getModels({ brandCode }, pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!brandCode, 
  });

  const models = query.data?.pages.flatMap(page => page.data) ?? [];

  return {
    models,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
}
