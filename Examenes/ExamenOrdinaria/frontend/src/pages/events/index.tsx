import Viewer from "@/components/Viewer";
import { gql, useQuery } from "@apollo/client";
import React from "react";



export type Fecha = {
    day: number;
    month: number;
    year: number;
  };




const Events = () => {


    const [date, setDate] = React.useState<Fecha>({
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      });


    const dateString = `${date.year}-${(date.month + 1).toLocaleString("es-ES", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}-${date.day.toLocaleString("es-ES", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;

    return(
        <>

            <input value={dateString} type="date" onChange={(e) => {
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

            <Viewer day={date.day} month={date.month} year={date.year}></Viewer>
        </>
    )

}

export default Events;