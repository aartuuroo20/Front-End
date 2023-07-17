import Link from "next/link"
import { useEffect, useState } from "react"

type GetResponse = {
    id: string,
    name: string,
    image: string
}[]

const CharacterList = () => {

    const [page, setPage] = useState<number>(1)
    const [characters, setCharacters] = useState<GetResponse>([])

    useEffect(() => {
        const fetchCharactersPage = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json()
            setCharacters(data.results)

        }
        fetchCharactersPage()
    })

    

    return (
        <>
            <h1>Character List</h1>

            <div>
                <button onClick={() => setPage(page - 1)}>Next</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>

            <div>
                {
                    characters.map((character) => (
                        <li>
                            <img src={character.image}></img>
                            <Link href={`/character/${character.id}`}>{character.name}</Link>
                        </li>
                    ))
                }
            </div>
        
        </>
    )
}

export default CharacterList