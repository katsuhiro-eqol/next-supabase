//"use client"
import { supabase } from "@/utils/supabase/supabase"

export default async function EmbeddingsTable(){
  try {
    let { data: embeddings, error } = await supabase
      .from('embeddings')
      .select()
      return <pre>{JSON.stringify(embeddings, null, 2)}</pre>
  } catch (error) {
    console.log(error);
    return <pre>エラー</pre>
  }
}