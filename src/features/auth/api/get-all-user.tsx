import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({ query: {} });

      if (error) {
        console.error("Error fetching users:", error);
      }

      console.log(data);
      return data;
    },
  });

  return query;
};
