import getClient from "@/libs/client"
import { gql } from "@apollo/client"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { ParsedUrlQuery } from "querystring"
import React, { useEffect } from "react"

type QueryAnswer = {
    characters: {
        results: {
            id: string
            name: string
            image: string
        }[],
        info: Info
    }
}

type Info = {
    count: number
    pages: number
    next: string | null
    prev: string | null
}



interface Params extends ParsedUrlQuery {
    page: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const client = getClient()
    let paths = []

    const query = gql`
        query characters($page: Int!) {
            characters(page: $page) {
                info{
                    pages
                }
            }   
        }
    `

    const queryAnswer = await client.query<QueryAnswer>({
        query,
        variables: {
            page: 1
        }
    })


    for(let i = 1; i<=queryAnswer.data.characters.info.pages; i++) {
        paths.push({
            params: {
                page: i.toString()
            }
        })
    }

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {page} = context.params as Params
    const query = gql`
        query characters($page: Int!, $name: String) {
            characters(page: $page, filter: {name: $name}) {
                info{
                    next
                    prev
                }
                results{
                    id
                    name
                    image
                }
            }   
        }
    `
    const client = getClient()
    const queryAnswer = await client.query<QueryAnswer>({
        query,
        variables: {
            page: parseInt(page)
        }
    })

    return {
        props: {
            characters: queryAnswer.data.characters
        }
    }
}

const Characters: React.FC<QueryAnswer> = ({characters}) => {
    return (
        <div>
            <h1>Characters</h1>

            <div>
                <Link href={`/characters/${characters.info.prev}`}>Prev</Link>
                <Link href={`/characters/${characters.info.next}`}>Next</Link>
            </div>

            <div>
                {characters.results.map((character) => (
                    <div key={character.id}>
                        <Link href={`/character/${character.id}`}>{character.name}</Link>
                        <img src={character.image} alt={character.name}/>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Characters