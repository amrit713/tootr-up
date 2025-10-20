import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


interface useGetAttendancesProps {
    date: string,
    timeTableId: string,
    branchProgramId: string
}

export const useGetAttendances = ({ date, timeTableId, branchProgramId }: useGetAttendancesProps) => {

    const query = useQuery({
        enabled: false,
        queryKey: ["attendances", timeTableId, branchProgramId, date],
        queryFn: async () => {

            const response = await client.api["attendances"].$get({
                query: {
                    date, timeTableId, branchProgramId
                }
            })

            if (!response.ok) {
                throw new Error("failed to fetch attendance");
            }
            const { data } = await response.json();

            return data;
        }
    })

    return query
}