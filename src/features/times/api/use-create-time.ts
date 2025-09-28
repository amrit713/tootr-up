import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.times)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.times)["$post"]>;

export const useCreateTime = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.times.$post({
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("time created");
            queryClient.invalidateQueries({ queryKey: ["times"] });
            queryClient.invalidateQueries({ queryKey: [data.branchProgramId] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
