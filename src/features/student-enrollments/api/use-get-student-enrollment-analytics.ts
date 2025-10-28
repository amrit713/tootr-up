import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetStudentEnrollmentAnalytics = ({ enrollmentId }: { enrollmentId: string }) => {
    const query = useQuery({
        queryKey: ["studentEnrollment", enrollmentId],
        queryFn: async () => {
            const response = await client.api["student-enrollments"][":id"]["analytics"]["$get"]({ param: { id: enrollmentId } })

            if (!response.ok) {
                throw new Error("failed to fetch attendance analytics");
            }
            const { data } = await response.json();




            return data;
        }
    })

    return query
}