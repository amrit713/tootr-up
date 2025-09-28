import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.times)[":id"]["$delete"]>;
type RequestType = InferRequestType<(typeof client.api.times)[":id"]["$delete"]>;

export const useDeleteProgram = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.times[":id"]["$delete"]({
                param,

            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("time deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["times"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
