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

const PacientData = () => {

    const bookSlotMutation = gql`
        mutation BookSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!) {
            bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
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

    const [bookSlot] = useMutation(bookSlotMutation)

    const [viewDay, setViewDay] = useState<number>(0)
    const [viewMonth, setViewMonth] = useState<number>(0)
    const [viewYear, setViewYear] = useState<number>(0)
    const [dni, setDni] = useState<string>('')

    const bookSlotHandler = async (year: number, month: number, day: number, hour: number) => {
        await bookSlot({
            variables: {
                day: day,
                month: month,
                year: year,
                hour: hour,
                dni: dni
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

            <h2>Slot list</h2>

            <div>
                <input type="number" placeholder="Year" onChange={(e) => setViewYear(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Month" onChange={(e) => setViewMonth(parseInt(e.target.value))}></input>
                <input type="number" placeholder="Day" onChange={(e) => setViewDay(parseInt(e.target.value))}></input>
                <input type="number" placeholder="DNI" onChange={(e) => setDni(e.target.value)}></input>

            </div>

            <div>
                {
                    queryAnswer.data?.availableSlots.map((slot) => (
                        <li>
                            {slot.day}/{slot.month}/{slot.year}
                            <button onClick={() => bookSlotHandler(slot.year, slot.month, slot.day, slot.hour)}>Book</button>
                        </li>
                    ))   
                }
            </div>
        </>
    )

}

export default PacientData