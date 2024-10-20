import { createClient } from "@/utils/supabase/server";
import loadLyrics from "@/service/loadLyrics";
import SearchSong from "@/components/SearchSong";

export default async function LyricSearch() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  const lyrics = await loadLyrics()

  return (
    <div className="w-full">
        <div className="px-9 py-7">
            <SearchSong Lyrics={lyrics} />
        </div>
    </div>

    
  );
}
/*
className="px-9 py-7"
*/