import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { AttendanceStatus } from "@/generated/prisma/browser";


interface useGetStudentEnrollmentsProps {
    program: string,
    slotTime: string,
    date?: string
    attendanceStatus?: AttendanceStatus,
    name?: string
    isActive?: boolean
}

export const useGetStudentEnrollments = ({ program, slotTime, date, attendanceStatus, name, isActive }: useGetStudentEnrollmentsProps) => {

    const query = useQuery({
        enabled: false,
        queryKey: ["student-enrollments", program, slotTime, date],
        queryFn: async () => {

            const response = await client.api["student-enrollments"].$get({
                query: {
                    program, slotTime, date, attendanceStatus, name, isActive
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