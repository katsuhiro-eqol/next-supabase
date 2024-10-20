import { createClient } from "@/utils/supabase/server";
import loadLyrics from "@/service/loadLyrics";
import QuizLyric from "@/components/QuizLyric";


export default async function LyricGamePage() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  const lyrics = await loadLyrics()


  return (
    <div className="w-full">
    <div className="px-9 py-7">
        <QuizLyric Lyrics={lyrics} />
    </div>
    </div>
  );
}
/*
className="px-9 py-7"
*/