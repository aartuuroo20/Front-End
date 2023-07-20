import { use, useEffect, useState } from "react";

type Evento = {
    _id: string,
    titulo: string,
    descripcion: string,
    fecha: Date,
    horaInicio: number,
    horaFinal: number,
    invitados: string[]
}


const Events = () => {

    const [addTitulo, setAddTitulo] = useState<string>('')
    const [addDescripcion, setAddDescripcion] = useState<string>('')
    const [addFecha, setAddFecha] = useState<Date>()
    const [addInicio, setAddInicio] = useState<number>()
    const [addFin, setAddFin] = useState<number>()
    const [addInvitados, setAddInvitados] = useState<string>('')

    const [eventos, setEventos] = useState<Evento[]>([])

    const [updateTitulo, setUpdateTitulo] = useState<string>('')
    const [updateDescripcion, setUpdateDescripcion] = useState<string>('')
    const [updateFecha, setUpdateFecha] = useState<Date>()
    const [updateInicio, setUpdateInicio] = useState<number>()
    const [updateFin, setUpdateFin] = useState<number>()
    const [updateInvitados, setUpdateInvitados] = useState<string>('')

    const [addEventError, setAddEventError] = useState<boolean>(false)
    const [updateEventError, setUpdateEventError] = useState<boolean>(false)

    const addEventHandler = async () => {
        try {
            const response = await fetch('http://localhost:8080/addEvent', {
                method: 'POST',
                body: JSON.stringify({
                    titulo: addTitulo,
                    descripcion: addDescripcion,
                    fecha: addFecha,
                    horaInicio: addInicio,
                    horaFinal: addFin,
                    invitados: addInvitados.split(', ')
                })
            })
            const data = await response.json()
            setAddEventError(false)
            getEventsHandler()
        } catch (error) {
            setAddEventError(true)
        }
    }

    const getEventsHandler = async () => {
        const response = await fetch('http://localhost:8080/events')
        const data = await response.json()
        setEventos(data)
    }

    const deleteEventHandler = async (id: string) => {
        const response = await fetch(`http://localhost:8080/deleteEvent/${id}`, {
            method: 'DELETE'
        })
        getEventsHandler()
    }

    const updateEventHandler = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/updateEvent`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    titulo: updateTitulo,
                    descripcion: updateDescripcion,
                    fecha: updateFecha,
                    horaInicio: updateInicio,
                    horaFinal: updateFin,
                    invitados: updateInvitados.split(', ')
                })
            })
            const data = await response.json()
            const index = eventos.findIndex((evento) => evento._id === id) 
            const newEvents = eventos
            newEvents.splice(index, 1, data)
            setEventos(newEvents)
            setUpdateEventError(false)
            getEventsHandler()
        } catch (error) {
            setUpdateEventError(true)
        }
    }

    useEffect(() => {
        getEventsHandler()
    }, [])

    return (
        <>
        <h1>Events</h1>

        <h2>Add Event</h2>

        <div>
            <input type="text" placeholder="titulo" value={addTitulo} onChange={(e) => setAddTitulo(e.target.value)}></input>
            <input type="text" placeholder="descripcion" value={addDescripcion} onChange={(e) => setAddDescripcion(e.target.value)}></input>
            <input type="date" placeholder="fecha" onChange={(e) => setAddFecha(new Date(e.target.value))}></input>
            <input type="number" placeholder="hora inicio" value={addInicio} onChange={(e) => setAddInicio(parseInt(e.target.value))}></input>
            <input type="number" placeholder="hora fin" value={addFin} onChange={(e) => setAddFin(parseInt(e.target.value))}></input>
            <input type="text" placeholder="invitados" value={addInvitados} onChange={(e) => setAddInvitados(e.target.value)}></input>
            <button onClick={() => addEventHandler()}>Add event</button>
            {
                addEventError && <p>Error al añadir evento</p>
            }
        </div>

        <h2>Event List</h2>

        <div>
            {
                eventos.map((evento) => {
                    const date = new Date(evento.fecha)
                    return (
                        <div key={evento._id}>
                            <h3>{evento.titulo}</h3>
                            <p>
                                Fecha: {date.getDate()}/{date.getMonth()}/{date.getFullYear()} 
                                Description: {evento.descripcion} 
                                Horario: {evento.horaInicio} - {evento.horaFinal} 
                                Invitados: {evento.invitados.join(', ')}
                                <button onClick={() => {deleteEventHandler(evento._id)}}>Delete</button>
                                <button onClick={() => updateEventHandler(evento._id)}>Update</button>
                            </p>
                            
                        </div>
                    )
                })
            }
        </div>

        <h2>Update Event</h2>

        <div>
            <input type="text" placeholder="titulo" value={updateTitulo} onChange={(e) => setUpdateTitulo(e.target.value)}></input>
            <input type="text" placeholder="descripcion" value={updateDescripcion} onChange={(e) => setUpdateDescripcion(e.target.value)}></input>
            <input type="date" placeholder="fecha" onChange={(e) => setUpdateFecha(new Date(e.target.value))}></input>
            <input type="number" placeholder="hora inicio" value={updateInicio} onChange={(e) => setUpdateInicio(parseInt(e.target.value))}></input>
            <input type="number" placeholder="hora fin" value={updateFin} onChange={(e) => setUpdateFin(parseInt(e.target.value))}></input>
            <input type="text" placeholder="invitados" value={updateInvitados} onChange={(e) => setUpdateInvitados(e.target.value)}></input>
            {
                updateEventError && <p>Error al actualizar evento</p>
            }
        </div>
        </>
    )
}

export default Events;