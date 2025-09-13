import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const session = await authClient.getSession();

      if (!session || !session?.data) {
        return null;
      }

      return session.data?.user;
    },
  });

  return { user, isLoading };
};
