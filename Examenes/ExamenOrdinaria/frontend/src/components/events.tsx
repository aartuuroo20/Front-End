import { gql, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

type QueryResponse = {events: {
    date: Date,
    description: string,
    endHour: number,
    id: string,
    startHour: number,
    title: string
}[]}



const Events = () => {

    const query = gql`
        query {
            events {
                id
                title
                description
                endHour
                startHour
                date
            }
        }`

    const addEventMutation = gql`
        mutation CreateEvent($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
            createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
                id
                title
                description
                endHour
                startHour
                date
            }
        }`

    const deleteEventMutation = gql`
        mutation DeleteEvent($deleteEventId: ID!) {
            deleteEvent(id: $deleteEventId) {
                id
                title
                description
                endHour
                startHour
                date
            }
        }`

    const updateEventMutation = gql`
        mutation UpdateEvent($updateEventId: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
            updateEvent(id: $updateEventId, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
                id
                title
                description
                endHour
                startHour
                date
            }
        }`

    const queryAnswer = useQuery<QueryResponse>(query, {
        fetchPolicy: "network-only"
    })

    const [createEvent] = useMutation(addEventMutation)
    const [deleteEvent] = useMutation(deleteEventMutation)
    const [updateEvent] = useMutation(updateEventMutation)

    const [addTitle, setAddTitle] = useState<string>("")
    const [addDescripcion, setAddDescripcion] = useState<string>("")
    const [addStartHour, setAddStartHour] = useState<string>("")
    const [addEndHour, setAddEndHour] = useState<string>("")
    const [addDate, setAddDate] = useState<string>("")

    const [updateTitle, setUpdateTitle] = useState<string>("")
    const [updateDescripcion, setUpdateDescripcion] = useState<string>("")
    const [updateStartHour, setUpdateStartHour] = useState<string>("")
    const [updateEndHour, setUpdateEndHour] = useState<string>("")
    const [updateDate, setUpdateDate] = useState<string>("")

    const [addShowError, setAddShowError] = useState<boolean>(false)
    const [updateShowError, setUpdateShowError] = useState<boolean>(false)

    const addEventHandler = async () => {
        try {
            await createEvent({
                variables: {
                    title: addTitle,
                    description: addDescripcion,
                    startHour: parseInt(addStartHour),
                    endHour: parseInt(addEndHour),
                    date: new Date(addDate)
                }
            })
            await queryAnswer.refetch()
            setAddShowError(false)
        } catch (error) {
            setAddShowError(true)
        }
    }

    const deleteEventHandler = async (id: string) => {
        await deleteEvent({
            variables: {
                deleteEventId: id
            }
        })
        await queryAnswer.refetch()
    }

    const updateEventHandler = async (id: string, title: string, description: string, date: Date, startHour: number, endHour: number) => {
        try {
            await updateEvent({
                variables: {
                    updateEventId: id,
                    title: updateTitle,
                    description: updateDescripcion,
                    startHour: parseInt(updateStartHour),
                    endHour: parseInt(updateEndHour),
                    date: new Date(updateDate)
                }
            })
            await queryAnswer.refetch()
            setUpdateShowError(false)
        } catch (error) {
            setUpdateShowError(true)
        }
        
    }

    if(queryAnswer.loading) return (<p>Loading...</p>)
    if(queryAnswer.error) return (<p>Error</p>)

    return (
        <>
            <h1>Events</h1>

            <h2>Events List</h2>

            <ul>
                {
                    queryAnswer.data?.events.map((event) => {
                        const date = new Date(event.date)
                        return (
                            <>
                                <li>
                                    title: {event.title} date: {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} description: {event.description} Hours: {event.startHour} - {event.endHour}
                                    <button onClick={() => deleteEventHandler(event.id)}>Delete</button>
                                    <button onClick={() => updateEventHandler(event.id, event.title, event.description, event.date, event.startHour, event.endHour)}>Update</button>
                                </li>
                            </>
                        )
                    })
                }
            </ul>

            <h2>Create Events</h2>

            <div>
                Title: <input type="text"  onChange={(e) => setAddTitle(e.target.value)}></input>
                Descripcion: <input type="text"  onChange={(e) => setAddDescripcion(e.target.value)}></input>
                Date: <input type ='date' onChange={(e) => setAddDate(e.target.value)}></input>
                Start Hour: <input type="number"  onChange={(e) => setAddStartHour(e.target.value)}></input>
                End Hour: <input type="number"  onChange={(e) => setAddEndHour(e.target.value)}></input>
                <button onClick={() => addEventHandler()}>Add Event</button>
                 
                {
                    addShowError && <p>Error</p>
                }
            </div>

            <h2>Update Events</h2>

            <div>
                Title: <input type="text"  onChange={(e) => setUpdateTitle(e.target.value)}></input>
                Descripcion: <input type="text"  onChange={(e) => setUpdateDescripcion(e.target.value)}></input>
                Date: <input type ='date' onChange={(e) => setUpdateDate(e.target.value)}></input>
                Start Hour: <input type="number"  onChange={(e) => setUpdateStartHour(e.target.value)}></input>
                End Hour: <input type="number"  onChange={(e) => setUpdateEndHour(e.target.value)}></input>
                {
                    updateShowError && <p>Error</p>
                }
            </div>
        </>
    )
}

export default Events