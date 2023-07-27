import { useRouter } from "next/router";
import { useEffect, useState } from "react"

type Event = {
    id: string;
    title: string;
    date: Date;
    init: number;
    end: number;
    participants: string[];
};

function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

const Events = () => {

    const [eventos, setEventos] = useState<Event[]>([])
    const [actualDate, setActualDate] = useState<Date>(new Date())
    const fecha = actualDate.toISOString()
    const router = useRouter()

    const getEventsHandler = async (fecha: string) => {
        const response = await fetch(`http://localhost:4000/events?date=${fecha}`)
        const data = await response.json()
        console.log(data)
        setEventos(data)
    }

    const removeEventHandler = async (id: string) => {
        const response = await fetch(`http://localhost:4000/deleteEvent/${id}`, {
            method: 'DELETE'
        })
        getEventsHandler(fecha)
        
    }

    const diaAnteriorHandler = async () => {
        setActualDate(sumarDias(actualDate, -1))
        getEventsHandler(actualDate.toISOString())
    }

    const diaSiguienteHandler = async () => {
        setActualDate(sumarDias(actualDate, +1))
        getEventsHandler(actualDate.toISOString())
    }

    const addEventHandler = async () => {
        router.push("/addEvent")
    }

    useEffect(() => {
        getEventsHandler(fecha)
    }, [])

    return (


        <>
            <div>
                <button onClick={() => addEventHandler()}>Add evento</button>
                <button onClick={() => diaAnteriorHandler()}>Dia anterior</button>
                <button onClick={() => diaSiguienteHandler()}>Dia siguiente</button>
            </div>


            <h1>Eventos del {actualDate.toISOString()}</h1>

            <div>
                {
                    eventos.map((evento) => {
                        return (
                            <div>
                                <h1>{evento.title}</h1>
                                Hora Inicio: {evento.init}, 
                                Hora final: {evento.end}, 
                                Participantes: {evento.participants}
                                <button onClick={() => removeEventHandler(evento.id)}>Remove</button>

                            </div>                            
                            )
                    })
                }
            </div>

        </>
    )
}

export default Events