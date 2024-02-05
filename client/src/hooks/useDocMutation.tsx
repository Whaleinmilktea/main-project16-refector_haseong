import { useMutation } from "@tanstack/react-query";
import { CreatePostInterface } from "../types/post";

export const useDocMutation = (key: string, func: any) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationKey: [key],
    mutationFn: (data : CreatePostInterface) => func(data),
  });
  return { mutate, isLoading, isError };
}