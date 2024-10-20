//予約の空きがあるかどうか判定する関数。
export function judgeAvailability(events, day, openning, closing, time){
    const open = new Date(day + "T" +openning + ":00")
    const close = new Date(day + "T" +closing + ":00")
    const n = events.length
    let maxDiff = 0

    if (n<1){
        return true
    } else if (new Date(events[0]["start"]) - open >= time){
        console.log("start")
        return true
    } else if (close - new Date(events[n-1]["end"]) >= time){
        console.log("end", close - new Date(events[n-1]["end"]) )
        return true
    } else {
        for (let i = 0; i < n-1; i++){
            const diff = new Date(events[i+1]["start"]) - new Date(events[i]["end"])
            if (diff > maxDiff) {
                maxDiff = diff
            }
        }
        console.log("maxDiff", maxDiff)
        if (maxDiff >= time){
            return true
        } else {
            return false
        }
    }
}


export function judgeCanReserve(events, start, day, openning, closing, time){
    const open = new Date(day + "T" +openning + ":00")
    const close = new Date(day + "T" +closing + ":00")
    const eventStart = new Date(start)
    const n = events.length

    if (n==0){
        if (eventStart >= open && close - eventStart>=time){
            return true
        } else {
            false
        }
    } else {
        let insertPosition = -1
        for (let i = 0; i < n; i++){
            if (eventStart-new Date(events[i]["start"]) > 0){
                insertPosition = i
            }
        }
        console.log(insertPosition)
        if (insertPosition == -1){
            if (eventStart >= open && new Date(events[0]["start"])-eventStart>=time){
                return true
            } else {
                return false
            }
        } else if (insertPosition == n-1){
            if (close-eventStart >= time){
                return true
            } else {
                return false
            }
        } else {
            if (eventStart - new Date(events[insertPosition]["end"])>=0 && new Date(events[insertPosition+1]["start"])-eventStart>=time){
                return true
            } else {
                return false
            }
        }
    }
}

export function setNewEvents(events, data){
    const eventStart = new Date(data["start"])
    const n = events.length
    const newEvent = {title:data["user"], start:data["start"], end:data["end"]}
    let newEvents = []
    let insertPosition = -1
    if (n==0){
        newEvents.push(newEvent)
        return newEvents
    } else {
        for (let i = 0; i < n; i++){
            if (eventStart-new Date(events[i]["start"]) > 0){
                insertPosition = i
            }
        }
        console.log(insertPosition)
        newEvents = events
        newEvents.splice(insertPosition+1,0,newEvent)
        return newEvents
    }
}


/*
(new Date(start) - new Date(events[insertPosition]["start"]) >= time)
*/
/*
import { supabase } from "@/utils/supabase/supabase"

async function loadReservationData(){
    const now = new Date()
    const todayISOString = now.toISOString()
    try {
        let { data: reservations, error } = await supabase
          .from('reservation')
          .select("*")
          .gte("start",todayISOString)
          .order('start', { ascending: true })
        if (error) throw error
        return reservations
      } catch (error) {
        console.log(error)
        return null
      }
}
    */