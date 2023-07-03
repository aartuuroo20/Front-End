import { gql ,useMutation,useQuery} from "@apollo/client";
import React, {FC, use, useEffect} from "react";


const ClientSlots: FC<{day: number|undefined, month: number|undefined, year: number|undefined, dni: string|undefined}> = ({day, month, year, dni}) => {
    const query = gql`
        query availableSlots($day: Int, $month: Int!, $year: Int!) {
          availableSlots (day: $day, month: $month, year: $year){
            day
            month
            year
            hour
            available
            dni
          }
        }
    `

  const bookSlotMutation = gql`
    mutation bookSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!) {
        bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
          day
          month
          year
          hour
          dni
          available
        }
      } 
  `;

    const [bookSlot] = useMutation(bookSlotMutation)

    const {loading,error,data, refetch} = useQuery<{
        availableSlots: {day: number, month: number, year: number, hour: number}[]
    }>(
      query,{
      variables: {
        day: day,
        month: month,
        year: year
      }
    })

    const bookSlotsHandler = async (bookDay: number, bookMonth: number, bookYear: number, bookHour: number) => {
         await bookSlot({variables: {day: bookDay, month: bookMonth, year: bookYear, hour: bookHour, dni: dni}})
    }

    useEffect(() => {
      refetch()
    }, [bookSlotsHandler])

    return(
      <div>
        <ul>
            {data?.availableSlots.map((slot) => (
                <li key={slot.day}>
                    Day: {slot.day} Month: {slot.month} Year: {slot.year} Hour: {slot.hour}
                    <button onClick={() => bookSlotsHandler(slot.day, slot.month, slot.year, slot.hour)}>Book Slot</button>
                </li>
            ))}
        </ul>

      </div>
    )
  }
  
export default ClientSlots;