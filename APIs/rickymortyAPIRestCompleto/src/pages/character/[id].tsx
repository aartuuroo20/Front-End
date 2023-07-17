import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { ParsedUrlQuery } from "querystring"

type CharacterProps = {
    character: {
        id: string,
        name: string,
        gender: string,
        image: string,
        location: {
            id: string,
            name: string,
        },
        episode: {
            name: string,
            id: string
        }[]
    }
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character")
    const data = await response.json()
    const paths = []

    const characters = data.info.count
    for(let i = 1; i < characters; i++){
        paths.push({
            params: {
                id: i.toString()
            }
        })
    }

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as Params

    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();

    data.episode = await Promise.all(data.episode.map(async (episode: any) => {
        const response = await fetch(episode)
        const data = await response.json()
        return data
    }))

    return {
        props: {
            character: data   
        }
    }
}



const Character = (props: CharacterProps) => {
    return (
        <>
            <h1>{props.character.name}</h1>

            <div>
                <img src={props.character.image}></img>
                <Link href={`/location/${props.character.location.id}`}>{props.character.location.name}</Link>
                <p>{props.character.gender}</p>
            </div>

            <div>
                {
                    props.character.episode.map((episode) => (
                        <li>
                            <Link href={`/episode/${episode.id}`}>{episode.name}</Link>
                        </li>
                    ))
                }
            </div>

        </>
    )
}

export default Character