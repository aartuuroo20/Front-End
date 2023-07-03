import ClientSlots from "@/components/clientSlots";
import { useState } from "react"


/*
La renderizacion del paciente se realiza en el el cliente debido a que al igual que el medico, se necesita mucha interaccion con el usuario y la informacion es muy cambiante, 
tampoco hace falta indexar datos.
Al igual que en el medico, la renderizacion de los slots disponibles se realiza en el componente ClientSlots, este componente recibe el año, mes y dia del slot que se quiere ver y realiza una query a la base de datos.
La llamada a esta query se realiza tambien en el cliente.
*/



const Paciente = () => {
    const [bookDni, setBookDni] = useState<string>()

    const [viewDay, setViewDay] = useState<number>()
    const [viewMonth, setViewMonth] = useState<number>()
    const [viewYear, setViewYear] = useState<number>()

    return (
        <>
            <h1>Paciente</h1>

            <h2>View Available Slots</h2>

            <div>
                Year: <input type="number" value={viewYear} onChange={(e) => setViewYear(parseInt(e.target.value))}></input>
                Month: <input type="number" value={viewMonth} onChange={(e) => setViewMonth(parseInt(e.target.value))}></input>
                Day: <input type="number" value={viewDay} onChange={(e) => setViewDay(parseInt(e.target.value))}></input>
                DNI: <input type="text" value={bookDni} onChange={(e) => setBookDni(e.target.value)}></input>
            </div>

            <ClientSlots day={viewDay} month={viewMonth} year={viewYear} dni={bookDni}></ClientSlots>
        </>
    )   
}

export default Paciente