import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
export type Fecha = {
    day: number;
    month: number;
    year: number;
  };



const ModifyEvents = () => {

    const [date, setDate] = React.useState<Fecha>({
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      });

    const createEventMutation = gql`
        mutation CreateEvent($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
            createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
                date
                endHour
                id
                description
                startHour
                title
            }
        }`



    const [createEvent] = useMutation(createEventMutation)

    const [addTitle, setAddTitle] = useState<String>("")
    const [addDescripcion, setAddDescripcion] = useState<String>("")
    const [addStartHour, setAddStartHour] = useState<number>()
    const [addEndHour, setAddEndHour] = useState<number>()

    const dateString = `${date.year}-${(date.month + 1).toLocaleString("es-ES", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}-${date.day.toLocaleString("es-ES", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;

      const addEventHandler = async () => {
        await createEvent({variables: {title: addTitle, description: addDescripcion, date: dateString, startHour: addStartHour, endHour: addEndHour}})
    }

    return(
        <>
            <h1>Create Event</h1>

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
                <button onClick={() => addEventHandler()}>Add Event</button>
            </div>
        </>
    )

}

export default ModifyEvents;