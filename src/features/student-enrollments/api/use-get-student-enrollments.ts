import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


interface useGetStudentEnrollmentsProps {
    program: string,
    slotTime: string,
    date?: string
}

export const useGetStudentEnrollments = ({ program, slotTime, date }: useGetStudentEnrollmentsProps) => {

    const query = useQuery({
        enabled: false,
        queryKey: ["student-enrollments", program, slotTime, date],
        queryFn: async () => {

            const response = await client.api["student-enrollments"].$get({
                query: {
                    program, slotTime, date
                }
            })

            if (!response.ok) {
                throw new Error("failed to fetch student-enrollments");
            }
            const { data } = await response.json();

            return data;
        }
    })

    return query
}