import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { leadSchema } from "@/schema";

type ResponseType = InferResponseType<(typeof client.api.programs)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.programs)["$post"]>;

export const useCreateProgram = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.programs.$post({
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("program up created");
            queryClient.invalidateQueries({ queryKey: ["programs"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
