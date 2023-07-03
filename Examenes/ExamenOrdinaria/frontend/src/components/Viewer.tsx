import { gql, useMutation, useQuery } from "@apollo/client"
import React from "react";
import { FC, useEffect, useState } from "react"



export type Fecha = {
    day: number;
    month: number;
    year: number;
  };



const Viewer: FC<{day: number, month: number, year: number}> = ({day, month, year}) => {

    const [date, setDate] = React.useState<Fecha>({
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      });


    const seeEventsQuery = gql`
        query Events {
            events {
                id
                title
                description
                startHour
                endHour
            }
        }`

    const removeEventMutation = gql`
        mutation DeleteEvent($id: ID!) {
            deleteEvent(id: $id) {
        id
        title
        description
        date
        startHour
        endHour
    }
}`

    const updateEventMutation = gql`
        mutation UpdateEvent($id: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
            updateEvent(id: $id, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
            id
        title
        description
        date
        startHour
        endHour
    }
}`

const [addTitle, setAddTitle] = useState<String>("")
const [addDescripcion, setAddDescripcion] = useState<String>("")
const [addStartHour, setAddStartHour] = useState<number>()
const [addEndHour, setAddEndHour] = useState<number>()  

    const [removeEvent] = useMutation(removeEventMutation)
    const [updateEvent] = useMutation(updateEventMutation)

    const {loading,error,data, refetch} = useQuery<{
        events: {title: string, description: string, startHour: number, endHour: number, id: String, date: Date}[]
    }>(seeEventsQuery)


    if (loading) return <>Loading...</>;
    if (error) return <>Error {error.toString()}</>;

    const removeEventHandler = async (id: String) => {
        await removeEvent({variables: {id}})
    }

    const dateString = `${year}-${(month + 1).toLocaleString("es-ES", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}-${day.toLocaleString("es-ES", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;

    const updateEventHandler = async(id: String, title: String, description: String, date: Date, startHour: number, endHour: number) => {
        await updateEvent({variables:{id: id, title: title, description: description, date: date, startHour: startHour, endHour: endHour}})
    }

    return(
        <>
            <ul>
                {data && data?.events.map((event) => (
                    <li key={event.id}>
                        Titulo: {event.title} Descripcion: {event.description}  horaInicio: {event.startHour} 
                        horaFinal: {event.endHour} Año:{year} Mes:{month+1} Dia:{day}
                        <button onClick={() => removeEventHandler(event.id)}>
                            Remove
                        </button>

                        <button onClick={() => updateEventHandler(event.id, addTitle, addDescripcion, date, addStartHour, addEndHour)}>
                            Update
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                Title: <input type="text"  onChange={(e) => setAddTitle(e.target.value)}></input>
                Descripcion: <input type="text"  onChange={(e) => setAddDescripcion(e.target.value)}></input>
                Date: <input type="date" value={dateString}  onChange={(e) => {
                    console.log("date: ", e.target.value);
                    const date: string = e.target.value; // YYYY-MM-DD
                    let [year, month, day] = date.split("-");
                    month = (parseInt(month) - 1).toString();
                    console.log(year, month, day);
                    setDate({
                    day: parseInt(day),
                    month: parseInt(month),
                    year: parseInt(year),
                });
                }}></input>

                Start Hour: <input type="number" value={addStartHour} onChange={(e) => setAddStartHour(parseInt(e.target.value))}></input>
                End Hour: <input type="number" value={addEndHour} onChange={(e) => setAddEndHour(parseInt(e.target.value))}></input>
            </div>
        </>
    )
}

export default Viewer