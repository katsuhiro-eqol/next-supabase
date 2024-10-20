import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/supabase"

export default async function ProtectedPage() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  let title:string = ""

  try {
    let { data: embeddings, error } = await supabase
      .from('embeddings')
      .select()
      title = embeddings[1].title
  } catch (error) {
    console.log(error);
  }
  
  return (
    <div className="px-9 py-7">
      {user ? (
          <h3>タイトルは{title}</h3>
      ):(
      <p>ログインしてください</p>)}
    </div>
    
  );
}
