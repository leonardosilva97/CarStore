import { useInfiniteQuery } from '@tanstack/react-query';
import { carsService } from '../carsService';
import { PaginatedBrands } from '../carsTypes';

export function useBrandsGet() {
  const query = useInfiniteQuery<PaginatedBrands, Error>({
    queryKey: ['brands'],
    queryFn: ({ pageParam = 1 }) => carsService.getBrands(pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const brands = query.data?.pages.flatMap(page => page.data) ?? [];

  return {
    brands,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
}
