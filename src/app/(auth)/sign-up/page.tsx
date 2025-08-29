import { redirect } from "next/navigation";

import { currentUser } from "@/lib/current-user";
import { SignUpView } from "@/features/auth/components/sign-up";

async function SignupPage() {
  //   const user = await currentUser();
  //   if (user) {
  //     redirect("/");
  //   }
  return <SignUpView />;
}

export default SignupPage;
