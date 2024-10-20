import { supabase } from "@/utils/supabase/supabase"

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let { data: stories, error } = await supabase
          .from('embeddings')
          .select()
          
        if (error) {
          throw error;
        }
        //return NextResponse.json(embeddings);
        return NextResponse.json(stories)
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 });
      }
  }