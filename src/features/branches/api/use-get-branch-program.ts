import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetBranchPrograms = ({ branchId }: { branchId?: string }) => {

    const query = useQuery({
        queryKey: ["branchProgram", branchId],
        queryFn: async () => {
            if (!branchId) {
                return null
            }
            const response = await client.api.branches[":branchId"]["branch-programs"]["$get"]({
                param: {
                    branchId
                }
            })

            if (!response.ok) {
                throw new Error("failed to fetch branch program");
            }
            const { data } = await response.json();



            return data;
        }
    })




    return query
}