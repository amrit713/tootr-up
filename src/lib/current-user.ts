import { headers } from "next/headers";
import { auth } from "./auth";

// if pending page is need we will do later

export const currentUser = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            return null
        }

        return session.user;
    } catch {
        return null;
    }
};