import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetLeads = () => {
    const query = useQuery({
        queryKey: ["leads"],
        queryFn: async () => {
            const response = await client.api.leads.$get()

            if (!response.ok) {
                throw new Error("failed to fetch leads");
            }
            const { data } = await response.json();
            console.log("🚀 ~ useGetLeads ~ data:", data)



            return data;
        }
    })

    return query
}