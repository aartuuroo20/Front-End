import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

type QueryResponse = {
    character: {
        name: string,
        gender: string,
        image: string,
        location: {
            id: string,
            name: string
        },
        episode: {
            id: string,
            name: string
        }[]
    }
}

const Character: React.FC<{id: string}> = ({id}) => {

        const query = gql`
            query character($id: ID!) {
                character(id: $id) {
                    name
                    gender
                    image
                    location{
                        id
                        name
                    }
                    episode{
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
    }
)

        if (queryAnswer.loading) {
            return <p>Loading...</p>
        }

        if (queryAnswer.error) {
            return <p>Error</p>
        }
                 
    
        return (
            <div>
                <h1>Character</h1>

                <div>
                    <img src={queryAnswer.data?.character.image} alt={queryAnswer.data?.character.name} />
                    <h2>{queryAnswer.data?.character.name}</h2>
                    <Link href={`/location/${queryAnswer.data?.character.location.id}`}>{queryAnswer.data?.character.location.name}</Link>
                    <p>{queryAnswer.data?.character.gender}</p>
                    <div>
                        {
                            queryAnswer.data?.character.episode.map((episode) => (
                                <div key={episode.id}>
                                    <Link href={`/episode/${episode.id}`}>{episode.name}</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )

}

export default Character;