import { useQuery } from "@tanstack/react-query";

export const useDocQuery = (key: string, func: any) => {
  const {data, isLoading, isError} = useQuery({
    queryKey: [key],
    queryFn: () => func,
  });
  return {data, isLoading, isError};
};
