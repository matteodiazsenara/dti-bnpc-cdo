import { SignUpForm } from "@/components/sign-up-form";
import { AuthLayout } from "@/components/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <div className="w-full">
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}
