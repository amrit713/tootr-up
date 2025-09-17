import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface Props {
  leadId: string;
}

export const useGetFollowUps = ({ leadId }: Props) => {
  const query = useQuery({
    queryKey: ["followUps"],
    queryFn: async () => {
      const response = await client.api.followups.$get({ query: { leadId } });

      if (!response.ok) {
        throw new Error("failed to fetch follow ups");
      }
      const { data, total } = await response.json();

      return { data, total };
    },
  });

  return query;
};
