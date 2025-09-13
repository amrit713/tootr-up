import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetPrograms = () => {
    const query = useQuery({
        queryKey: ["programs"],
        queryFn: async () => {
            const response = await client.api.programs.$get()

            if (!response.ok) {
                throw new Error("failed to fetch programs");
            }
            const { data } = await response.json();

            return data;
        }
    })

    return query
}