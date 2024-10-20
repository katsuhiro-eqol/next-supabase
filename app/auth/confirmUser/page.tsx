import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";

export default function ConfirmUser({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const confirmUser = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/confirmUser/inputPassword`,
      });
      if (error){
        console.log(error)
      }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground">
      <div className="py-14 font-bold text-xl">登録状況確認</div>
        <label className="text-md" htmlFor="email">
          登録済みemail
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <SubmitButton
          formAction={confirmUser}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Sending email for Conformation..."
        >
          Send Conformation Email
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
