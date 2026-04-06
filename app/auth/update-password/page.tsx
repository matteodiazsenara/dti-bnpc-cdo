import { UpdatePasswordForm } from "@/components/update-password-form";
import { AuthLayout } from "@/components/auth-layout";

export default function Page() {
  return (
    <AuthLayout>
      <div className="w-full">
        <UpdatePasswordForm />
      </div>
    </AuthLayout>
  );
}
