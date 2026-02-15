import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Button } from "@heroui/button";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-3">
      <span className="text-sm">{user.email}</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button size="sm" variant="bordered">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button size="sm" className="bg-blue-600 text-white">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
