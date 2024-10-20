import { createClient } from "@/utils/supabase/server";
import { supabase } from '@/utils/supabase/supabase'

export default async function Index() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <div className="px-9 py-7">
      {user ? (<div>ユーザーID: {user.id}</div>):(<div>ログインしていません</div>)}
      Home
    </div>
  );
}