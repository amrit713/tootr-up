import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";
import { UserType } from "@/types";

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({ query: {} });

      return data;
    },
  });

  return query;
};
