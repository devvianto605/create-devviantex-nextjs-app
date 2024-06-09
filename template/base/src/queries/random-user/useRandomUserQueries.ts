'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getRandomUser } from '~/services';
import { QUERY_KEY } from '~/queries/query-key';

const useGetRandomUser = () => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { fetchNextPage: fetchMore, fetchPreviousPage, ...rest } = useInfiniteQuery({
    queryKey: [QUERY_KEY.RANDOM_USER],
    queryFn:() => getRandomUser(),
    select: (axiosResponse) => {
      return axiosResponse.pages.flatMap((page) => page.data.results);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage) {
        return undefined
      }

      return lastPageParam + 1
    },
    // getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
    //   if (firstPageParam <= 1) {
    //     return undefined
    //   }

    //   return firstPageParam - 1
    // },
  })
  
  return { fetchMore, ...rest}
};

export { useGetRandomUser };
