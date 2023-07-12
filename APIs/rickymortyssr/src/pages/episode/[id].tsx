import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import Link from "next/link";

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


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
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

    const client = getClient()
    const queryAnswer = await client.query<QueryResponse>({
        query,
        variables: {
            id
        }
    })

    return  {
        props: {
            episode: queryAnswer.data.episode
        }
    }

}

const Episode: React.FC<QueryResponse> = ({episode}) => {
    return (
        <div>
            <h1>Episode</h1>
            <div>
                <h2>{episode.name}</h2>
                <p>{episode.air_date}</p>
                <p>
                    {
                        episode.characters.map((character) => (
                            <div key={character.id}>
                                <Link href={`/character/${character.id}`}>{character.name}</Link>
                            </div>
                        ))
                    }
                </p>
            </div>
        </div>
    )
}

export default Episode