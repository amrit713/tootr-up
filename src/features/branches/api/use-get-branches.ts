import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetBranches = () => {
    const query = useQuery({
        queryKey: ["branches"],
        queryFn: async () => {
            const response = await client.api.branches.$get()

            if (!response.ok) {
                throw new Error("failed to fetch branches");
            }
            const { data } = await response.json();

            return data;
        }
    })

    return query
}