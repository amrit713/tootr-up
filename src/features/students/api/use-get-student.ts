import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetStudent = ({ studentId }: { studentId: string }) => {
    const query = useQuery({
        queryKey: ["student", studentId],
        queryFn: async () => {
            const response = await client.api.students[":id"]["$get"]({ param: { id: studentId } })

            if (!response.ok) {
                throw new Error("failed to fetch lead");
            }
            const { data } = await response.json();




            return data;
        }
    })

    return query
}