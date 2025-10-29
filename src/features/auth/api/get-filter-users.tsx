import { useQuery } from "@tanstack/react-query";

import { UserStatus } from "@/generated/prisma";
import { client } from "@/lib/rpc";

export const useGetFilterUsers = ({ status }: { status: UserStatus }) => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.auth.users.$get({
        query: { status },
      });

      if (!response.ok) {
        throw new Error("failed to users");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
