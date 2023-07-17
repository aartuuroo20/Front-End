import { GetServerSideProps } from "next"

type LocationProps = {
    location: {
        id: string,
        name: string,
        dimension: string,
        residents: {
            id: string,
            name: string
        }[]
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query
    const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`)
    const data = await response.json()
    
    data.residents = await Promise.all(data.residents.map(async (resident: any) => {
        const response = await fetch(resident)
        const data = await response.json()
        return data
    }))

    return {
        props: {
            location: data
        }
    }
}

const Location = (props: LocationProps) => {
    return(
        <>
            <h1>{props.location.name}</h1>

            <p>{props.location.dimension}</p>

            <div>
            {
                    props.location.residents.map((resident) => (
                        <li>
                            <p>{resident.name}</p>
                        </li>
                    ))
                }
            </div>
        
        </>
    )
}

export default Location