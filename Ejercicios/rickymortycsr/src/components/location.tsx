import { gql, useQuery } from "@apollo/client"
import Link from "next/link"


type QueryResponse = {
    location: {
        name: string,
        dimension: string,
        residents: {
            id: string,
            name: string
        }[]
    }
}

const Location: React.FC<{id: string}> = ({id}) => {
    const query = gql`
        query location($id: ID!) {
            location(id: $id) {
                name
                dimension
                residents{
                    id
                    name
                }
            }
        }
    `

    const queryAnswer = useQuery<QueryResponse>(
        query, {
        variables: {
            id,
        }
    })

    if (queryAnswer.loading) {
        return <p>Loading...</p>
    }

    if (queryAnswer.error) {
        return <p>Error</p>
    }

    return(
        <div>
            <h2>{queryAnswer.data?.location.name}</h2>
            <p>{queryAnswer.data?.location.dimension}</p>

            <div>
                {
                    queryAnswer.data?.location.residents.map((resident) => (
                        <div key={resident.id}>
                            <Link href={`/character/${resident.id}`}>{resident.name}</Link>
                        </div>
                    ))
                }
            </div>

        </div>
    )

}

export default Location;