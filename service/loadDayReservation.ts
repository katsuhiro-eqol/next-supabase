import { supabase } from "@/utils/supabase/supabase"

export default async function loadDayReservation(day:string, shop:string, staff:string){

    try {
        let { data: reservations, error } = await supabase
          .from('reservation')
          .select("*")
          .eq("day",day)
          .eq("shop",shop)
          .eq("staff",staff)
          .order('start', { ascending: true })
        if (error) throw error
        let dayReservation = []
        reservations.map((reservation) => {
            const data = {title: reservation["user"], start: reservation["start"], end: reservation["end"]}
            dayReservation.push(data)
        })
        console.log(dayReservation)
        return dayReservation
      } catch (error) {
        console.log(error) 
        return null
      }
}