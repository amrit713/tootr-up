import { redirect } from "next/navigation";

import { currentUser } from "@/lib/current-user";
import { SignInView } from "@/features/auth/components/sign-in";

async function SigninPage() {
  const user = await currentUser();
  if (user) {
    redirect("/");
  }
  return <SignInView />;
}

export default SigninPage;
