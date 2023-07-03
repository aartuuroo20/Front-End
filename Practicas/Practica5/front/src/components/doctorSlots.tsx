import { gql ,useMutation,useQuery} from "@apollo/client";
import React, {FC, use, useEffect} from "react";


const DoctorSlots: FC<{day: number|undefined, month: number|undefined, year: number|undefined}> = ({day, month, year}) => {
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

  const removeSlotMutation = gql`
    mutation removeSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
      removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
          day
          month
          year
          hour
          dni
          available
        }
    }
`;


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

    const [removeSlot] = useMutation(removeSlotMutation)

    const removeSlotHandler = async (removeYear: number, removeMonth: number,  removeDay: number, removeHour: number) => {
      await removeSlot({variables: {day: removeDay, month: removeMonth, year: removeYear, hour: removeHour}})
    }

    useEffect(() => {
      refetch()
    }, [removeSlotHandler])

    return(
      <div>
        <ul>
            {data?.availableSlots.map((slot) => (
                <li key={slot.day}>
                    Day: {slot.day} Month: {slot.month} Year: {slot.year} Hour: {slot.hour}
                    <button onClick={() => removeSlotHandler(slot.year, slot.month, slot.day, slot.hour)}>
                      <i className="gg-trash"></i>
                    </button>
                </li>
            ))}
        </ul>

      </div>
    )
  }
  
export default DoctorSlots;