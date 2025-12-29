import { useQuery } from "@tanstack/react-query";
import { LeadStatus } from "@/generated/prisma/";

import { client } from "@/lib/rpc";

interface useGetLeadsProps {
    status?: string;
    dueDate?: string;
    search?: string;
    assigneeId?: string;
}

export const useGetLeads = ({
    status,
    dueDate,
    search,
    assigneeId,
}: useGetLeadsProps) => {
    const query = useQuery({
        queryKey: ["leads", status, dueDate, search, assigneeId],
        queryFn: async () => {
            const response = await client.api.leads.$get({
                query: {
                    status: status as LeadStatus,
                    dueDate,
                    search,
                    assigneeId,
                },
            });



            if (!response.ok) {
                throw new Error("failed to fetch leads");
            }
            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
