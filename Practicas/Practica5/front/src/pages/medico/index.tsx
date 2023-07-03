import { gql, useMutation } from "@apollo/client"
import {  useState } from "react"
import DoctorSlots from "@/components/doctorSlots"

/*
He decidido realizar al renderizacion en el cliente debido a:

    - No Renderizar de forma estatica ya que no seria eficiente, ya que los slots se pueden añadir y eliminar en cualquier momento haciendo que la informacion sea muy cambiante.
    - No renderizar en el servidor debido a que principalmente necesitas la informacion del usuario esto se debe realizar en el cliente y el cliente tiene mucha interaccion con la pagina web
    tampoco interesaria indexar los datos de la pagina.
    -Cliente necesita pasar parametros a querys y mutaciones

La renderizacion de los slots disponibles se realiza en el componente DoctorSlots, 
este componente recibe el año, mes y dia del slot que se quiere ver y realiza una query a la base de datos, donde se realiza en el cliente por lo mencionado anteriormente.

*/

const Medico = () => {

    const addSlotMutation = gql`
        mutation addSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!){
            addSlot(year: $year, month: $month, day: $day, hour: $hour) {
                day
                month
                year
                hour
                available
            }
        }
    `;

    const [addSlot] = useMutation(addSlotMutation)

    const [addDay, setAddDay] = useState<number>()
    const [addMonth, setAddMonth] = useState<number>()
    const [addYear, setAddYear] = useState<number>()
    const [addHour, setAddHour] = useState<number>()

    const [viewDay, setViewDay] = useState<number>()
    const [viewMonth, setViewMonth] = useState<number>()
    const [viewYear, setViewYear] = useState<number>()

    const addSlotHandler = () => {
        addSlot({variables: {day: addDay, month: addMonth, year: addYear, hour: addHour}})
    }

    return (
        <>
        <h1>Medico</h1>

        <h2>Add Slots</h2>
       
        <div>
            Year: <input type="number" value={addYear} onChange={(e) => setAddYear(parseInt(e.target.value))}></input>
            Month: <input type="number" value={addMonth} onChange={(e) => setAddMonth(parseInt(e.target.value))}></input>
            Day: <input type="number" value={addDay} onChange={(e) => setAddDay(parseInt(e.target.value))}></input>
            Hour: <input type="number" value={addHour} onChange={(e) => setAddHour(parseInt(e.target.value))}></input>     
            <button className="botones" onClick={() => addSlotHandler()}>Add Slot</button>
        </div>

        <h2>View Available Slots</h2>

        <div>
            Year: <input type="number" value={viewYear} onChange={(e) => setViewYear(parseInt(e.target.value))}></input>
            Month: <input type="number" value={viewMonth} onChange={(e) => setViewMonth(parseInt(e.target.value))}></input>
            Day: <input type="number" value={viewDay} onChange={(e) => setViewDay(parseInt(e.target.value))}></input>
        </div>

        <DoctorSlots day={viewDay} month={viewMonth} year={viewYear} ></DoctorSlots>

        </>
    )
    
}

export default Medico