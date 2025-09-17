import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";





export const useGetLeadAnalytics = () => {
    const query = useQuery({
        queryKey: ["analytics",],
        queryFn: async () => {
            const response = await client.api.leads.analytics.$get()

            if (!response.ok) {
                throw new Error("failed to fetch lead analytics");
            }
            const { data } = await response.json();




            return data;
        }
    })

    return query
}