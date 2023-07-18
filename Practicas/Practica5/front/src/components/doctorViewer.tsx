import { gql, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

type QueryResponse = {
    availableSlots: {
        day: number,
        month: number,
        year: number, 
        hour: number,
        available: boolean,
        dni: string
    }[]
}

const DoctorData = () => {

    const addSlotMutation = gql`
        mutation AddSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
            addSlot(year: $year, month: $month, day: $day, hour: $hour) {
                day
                month
                year
                hour    
                available
                dni
            }
        }
    `

    const query = gql`
        query Query($year: Int!, $month: Int!, $day: Int) {
            availableSlots(year: $year, month: $month, day: $day) {
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
        mutation RemoveSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
            removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
                day
                month
                year
                hour
                available
                dni
            }
        }
    `

    const [addSlot] = useMutation(addSlotMutation)
    const [removeSlot] = useMutation(removeSlotMutation)

    const [addDay, setAddDay] = useState<number>(0)
    const [addMonth, setAddMonth] = useState<number>(0)
    const [addYear, setAddYear] = useState<number>(0)
    const [addHour, setAddHour] = useState<number>(0)

    const [viewDay, setViewDay] = useState<number>(0)
    const [viewMonth, setViewMonth] = useState<number>(0)
    const [viewYear, setViewYear] = useState<number>(0)

    const addSlotHandler = async () => {
        await addSlot({
            variables: {
                day: addDay,
                month: addMonth,
                year: addYear,
                hour: addHour
            }
        })
        await queryAnswer.refetch()
    }

    const removeSlotHandler = async (year: number, month: number, day: number, hour: number) => {
        await removeSlot({
            variables: {
                year: year,
                month: month,
                day: day,
                hour: hour
            }
        })
        await queryAnswer.refetch()
    }

    const queryAnswer = useQuery<QueryResponse>(query, {
        fetchPolicy: 'network-only',
        variables: {
            day: viewDay,
            month: viewMonth,
            year: viewYear
        }
    })

    return (
        <>
            <h1>Doctor</h1>
            
            <h2>Add Slot</h2>

            <div>
                <input type="number" placeholder="Year" onChange={(e) => setAddYear(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Month" onChange={(e) => setAddMonth(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Day" onChange={(e) => setAddDay(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Hour" onChange={(e) => setAddHour(parseInt(e.target.value))}></input>
                <button onClick={() => addSlotHandler()}>Add</button>
            </div>

            <h2>Slot list</h2>

            <div>
                <input type="number" placeholder="Year" onChange={(e) => setViewYear(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Month" onChange={(e) => setViewMonth(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Day" onChange={(e) => setViewDay(parseInt(e.target.value))}></input>
            </div>

            <div>
                {
                    queryAnswer.data?.availableSlots.map((slot) => (
                        <li>
                            {slot.day}/{slot.month}/{slot.year}
                            <button onClick={() => removeSlotHandler(slot.year, slot.month, slot.day, slot.hour)}>Remove</button>
                        </li>
                    ))   
                }
            </div>
        </>
    )

}

export default DoctorData