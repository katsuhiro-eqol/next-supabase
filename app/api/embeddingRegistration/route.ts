import { supabase } from "@/utils/supabase/supabase"
import OpenAI from "openai"
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function GET(request: Request) {
    try {
        let { data: stories, error } = await supabase
          .from('embeddings')
          .select()
        if (stories?.length == 0){
            console.log("no data")
        } else {
            for (const story of stories!){
                if (!story.embedding){
                    const embedd = await openai.embeddings.create({
                        model: "text-embedding-3-small",
                        input: story.body,
                        encoding_format: "float",
                    });
                    const vector = embedd.data[0].embedding
                    console.log(vector.length)
                    const { error } = await supabase
                    .from('embeddings')
                    .update({embedding:vector})
                    .eq('id',story.id)
                }
            }
        }
        return NextResponse.json({data_count:stories?.length})
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 });
      }
  }