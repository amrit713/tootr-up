import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { PaymentStatus } from "@/generated/prisma";


interface useGetStudentsProps {
    branch?: string,
    program?: string,
    joinDate?: string,
    search?: string,
    paymentStatus?: PaymentStatus

}


export const useGetStudents = ({ branch, program, joinDate, search, paymentStatus }: useGetStudentsProps) => {

    const query = useQuery({
        queryKey: ["students", branch, program, joinDate, search, paymentStatus],
        queryFn: async () => {

            const response = await client.api.students.$get({
                query: {
                    branch, program, joinDate, search, paymentStatus
                }
            })

            if (!response.ok) {
                throw new Error("failed to fetch students");
            }
            const { data } = await response.json();

            return data;
        }
    })

    return query
}