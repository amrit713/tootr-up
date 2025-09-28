import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.programs)[":id"]["$patch"]>;
type RequestType = InferRequestType<(typeof client.api.programs)[":id"]["$patch"]>;

export const useUpdateProgram = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.programs[":id"]["$patch"]({
                param,
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("program up updated");
            queryClient.invalidateQueries({ queryKey: ["programs"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
