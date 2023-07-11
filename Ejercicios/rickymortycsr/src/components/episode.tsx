import { gql, useQuery } from "@apollo/client"
import Link from "next/link"


type QueryResponse = {
    episode: {
        name: string,
        air_date: string,
        characters: {
            id: string,
            name: string
        }[]
    }
}

const Episode: React.FC<{id: string}> = ({id}) => {
    const query = gql`
        query episode($id: ID!) {
            episode(id: $id) {
                name
                air_date
                characters{
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
            <h2>{queryAnswer.data?.episode.name}</h2>
            <p>{queryAnswer.data?.episode.air_date}</p>

            <div>
                {
                    queryAnswer.data?.episode.characters.map((character) => (
                        <div key={character.id}>
                            <Link href={`/character/${character.id}`}>{character.name}</Link>
                        </div>
                    ))
                }
            </div>

        </div>
    )

}

export default Episode;