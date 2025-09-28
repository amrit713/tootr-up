import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.branches)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.branches)["$post"]>;

export const useCreateBranch = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.branches.$post({
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("follow up created");
            queryClient.invalidateQueries({ queryKey: ["branches"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
