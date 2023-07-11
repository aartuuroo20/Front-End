import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import Link from "next/link";
import React from "react";

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


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
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

    const client = getClient()
    const queryAnswer = await client.query<QueryResponse>({
        query,
        variables: {
            id
        }
    })

    return {
        props: {
            character: queryAnswer.data.character
        }
    }
}




const Character: React.FC<QueryResponse> = ({character}) => {
    return (
        <div>
            <h1>Character</h1>
            <div>
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
                <p>{character.gender}</p>
                <Link href={`/location/${character.location.id}`}>{character.location.name}</Link>
                <p>
                    {
                        character.episode.map((episode) => (
                            <div key={episode.id}>
                                <Link href={`/episode/${episode.id}`}>{episode.name}</Link>
                            </div>
                        ))
                    }
                </p>
            </div>
        </div>
    )
}

export default Character