import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


interface useGetLeadsProps {
    status?: string,
    dueDate?: string,
    search?: string

}


export const useGetLeads = ({ status, dueDate, search }: useGetLeadsProps) => {
    const query = useQuery({
        queryKey: ["leads", status, dueDate, search],
        queryFn: async () => {
            const response = await client.api.leads.$get({
                query: {
                    status,
                    dueDate,
                    search
                }
            })

            if (!response.ok) {
                throw new Error("failed to fetch leads");
            }
            const { data, startOfDay, endOfDay } = await response.json();
            console.log("🚀 ~ useGetLeads ~ endOfDay:", endOfDay)
            console.log("🚀 ~ useGetLeads ~ startOfDay:", startOfDay)



            return data;
        }
    })

    return query
}