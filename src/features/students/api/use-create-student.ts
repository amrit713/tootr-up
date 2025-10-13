import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.students)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.students)["$post"]>;

export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.students.$post({
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("student created successfully");
            queryClient.invalidateQueries({ queryKey: ["students"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
