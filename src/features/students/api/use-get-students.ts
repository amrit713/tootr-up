import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { PaymentStatus } from "@/generated/prisma/browser";


interface useGetStudentsProps {
    branch?: string,
    program?: string,
    joinDate?: string,
    search?: string,
    paymentStatus?: PaymentStatus
    isActive?: string

}


export const useGetStudents = ({ branch, program, joinDate, search, paymentStatus, isActive }: useGetStudentsProps) => {

    const query = useQuery({
        queryKey: ["students", branch, program, joinDate, search, paymentStatus, isActive],
        queryFn: async () => {

            const response = await client.api.students.$get({
                query: {
                    branch, program, joinDate, search, paymentStatus, isActive
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