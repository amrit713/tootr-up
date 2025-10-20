import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.attendances)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.attendances)["$post"]>;

export const useCreateAttendance = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.attendances.$post({
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("attendance added or toggled");
            queryClient.invalidateQueries({ queryKey: ["attendances", "student-enrollments"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
