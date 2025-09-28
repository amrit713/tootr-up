import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetTimes = ({ branchProgramId }: { branchProgramId: string }) => {
    const query = useQuery({
        queryKey: ["times", branchProgramId],
        queryFn: async () => {
            const response = await client.api.times.$get({ query: { branchProgramId } })

            if (!response.ok) {
                throw new Error("failed to fetch times");
            }
            const { data } = await response.json();

            return data;
        }
    })

    return query
}