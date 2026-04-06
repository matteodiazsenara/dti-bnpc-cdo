import { LoginForm } from "@/components/login-form";
import { AuthLayout } from "@/components/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <div className="w-full">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
