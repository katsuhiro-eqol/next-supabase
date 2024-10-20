import { supabase } from "@/utils/supabase/supabase"

type obj = {
  user: string,
  staff: string,
  shop: string,
  day: string,
  start: string,
  end: string
}


export default async function Reservation(obj){
    try {
        let { data: Reservation, error } = await supabase
          .from('reservation')
          .insert(obj)
      } catch (error) {
        console.log(error)
      }
}