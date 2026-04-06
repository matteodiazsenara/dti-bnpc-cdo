import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { AuthLayout } from "@/components/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <div className="w-full">
        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  );
}
