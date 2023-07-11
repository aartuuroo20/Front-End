import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type QueryResponse = {
    characters: {
        results: {
            id: string
            name: string
            image: string
        }[]
    }
}

const CharacterList = () => {

    const [page, setPage] = useState<number>(1)
    const [name, setName] = useState<string>("")

    const query = gql`
        query characters($page : Int!, $name : String){
            characters(page:$page, filter:{name:$name}){
                results{
                    id
                    name
                    image
                }
            }
        }
    `

    const queryAnswer = useQuery<QueryResponse>(
        query, {
            variables: {
                page,
                name
            }
        }
    )

    useEffect(() => {
        queryAnswer.refetch({
            page,
            name
        })
    }, [page, name])

    if(queryAnswer.loading) return <div>Loading...</div>
    if(queryAnswer.error) return <div>Error</div>

    return (
        <>

            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={() => setPage(page - 1)}>Prev</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>

            <div className="paginas">
                {
                    queryAnswer.data?.characters.results.map((character) => (
                        <div key={character.id}>
                            <img src={character.image} alt={character.name} />
                            <Link href={`/character/${character.id}`}>{character.name}</Link>
                        </div>
                    ))

                }
            </div>
        </>
    )

}

export default CharacterList;