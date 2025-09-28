import { redirect } from "next/navigation";

import { currentUser } from "@/lib/current-user";
import { SignUpView } from "@/features/auth/components/sign-up";

// TODO: I need to fix it redirect to dashbord page and the return to sign in page
async function SignupPage() {
  const user = await currentUser();
  if (user) {
    redirect("/");
  }
  return <SignUpView />;
}

export default SignupPage;
