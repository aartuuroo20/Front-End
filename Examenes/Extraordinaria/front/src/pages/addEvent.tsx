import { useState } from "react"


const addEvent = () => {

    const [addTitulo, setAddTitulo] = useState<string>('')
    const [addFecha, setAddFecha] = useState<string>()
    const [addInicio, setAddInicio] = useState<number>()
    const [addFin, setAddFin] = useState<number>()
    const [addInvitados, setAddInvitados] = useState<string>('')

    const [addEventError, setAddEventError] = useState<boolean>(false)

    const addEventHandler = async () => {
        try {
            const response = await fetch('http://localhost:4000/addEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                title: addTitulo,
                date: addFecha,
                init: addInicio,
                end: addFin,
                participants: addInvitados.split(',')
            })
        })
            const data = await response.json()
            setAddEventError(false)
        } catch (error) {
            setAddEventError(true)
        }
    }

    return (
        <>
            <h1>add Event</h1>

            <div>
                <input type="text" placeholder="titulo" onChange={(e) => setAddTitulo(e.target.value)}></input>
                <input type="date" onChange={(e) => setAddFecha(e.target.value)}></input>
                <input type="number" placeholder="hora inicio" onChange={(e) => setAddInicio(parseInt(e.target.value))}></input>
                <input type="number" placeholder="hora fin" onChange={(e) => setAddFin(parseInt(e.target.value))}></input>
                <input type="text" placeholder="titulo" onChange={(e) => setAddInvitados(e.target.value)}></input>
                {
                    addInvitados
                }
                <button onClick={() => addEventHandler()}>Add Event</button>
                {
                    addEventError && <p>Error al añadir</p>
                }
            </div>
        </>
    )

}

export default addEvent