import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetAttendance = ({ id }: { id?: string }) => {


    const query = useQuery({
        queryKey: ["attendance", id],
        enabled: !!id,
        queryFn: async () => {
            if (!id) {
                return null
            }

            const response = await client.api.attendances[":id"]["$get"]({ param: { id } })



            if (!response.ok) {
                throw new Error("failed to fetch lead");
            }
            const { data } = await response.json();




            return data;
        },

    })

    return query
}