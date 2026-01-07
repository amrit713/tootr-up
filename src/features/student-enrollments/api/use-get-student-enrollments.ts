import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { AttendanceStatus } from "@/generated/prisma";


interface useGetStudentEnrollmentsProps {
    program: string,
    slotTime: string,
    date?: string
    attendanceStatus?: AttendanceStatus,
    name?: string
}

export const useGetStudentEnrollments = ({ program, slotTime, date, attendanceStatus, name }: useGetStudentEnrollmentsProps) => {

    const query = useQuery({
        enabled: false,
        queryKey: ["student-enrollments", program, slotTime, date],
        queryFn: async () => {

            const response = await client.api["student-enrollments"].$get({
                query: {
                    program, slotTime, date, attendanceStatus, name
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