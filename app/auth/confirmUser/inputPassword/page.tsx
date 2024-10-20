import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../submit-button";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const resetPassword = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin");
    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;
    const supabase = createClient();

    if (password !== password2){
      console.log("パスワードが一致しません")
      return
    }

    const { error } = await supabase.auth.updateUser({ 
      password: password });
    if (error) {
      console.log(error)
      return
    } 
    //return redirect("/auth/callback");
    return redirect("/protected")
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <div className="py-14 font-bold text-xl">パスワード再設定</div>
      <label className="text-md" htmlFor="password">
          Password入力
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
      <label className="text-md" htmlFor="password">
          Password再入力
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password2"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={resetPassword}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Sending email for Conformation..."
        >
          Reset Password
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