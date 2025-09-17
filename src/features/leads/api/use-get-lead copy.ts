import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetLead = (leadId: string) => {
    const query = useQuery({
        queryKey: ["lead", leadId],
        queryFn: async () => {
            const response = await client.api.leads[":leadId"]["$get"]({ param: { leadId } })

            if (!response.ok) {
                throw new Error("failed to fetch lead");
            }
            const { data } = await response.json();




            return data;
        }
    })

    return query
}