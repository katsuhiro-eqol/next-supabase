import { supabase } from "@/utils/supabase/supabase"

export default async function LoadLyrics(){
    try {
        let { data: Lyrics, error } = await supabase
          .from('Lyrics')
          .select()
          return Lyrics
      } catch (error) {
        return {}
      }
}