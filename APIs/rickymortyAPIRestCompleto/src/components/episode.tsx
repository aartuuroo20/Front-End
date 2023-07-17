import React, { useEffect, useState } from "react";

type Episode = {
    id: string,
    name: string,
    air_date: string,
    characters: {
        id: string,
        name: string
    }[]
}

const EpisodeData: React.FC<{id: string}> = ({id}) => {

    const [episode, setEpisode] = useState<Episode>()

    useEffect(() => {
        const fetchEpisode = async() => {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            const data = await response.json()

            data.characters = await Promise.all(data.characters.map(async (character: any) => {
                const response = await fetch(character)
                const data = await response.json()
                return data
            }))

            setEpisode(data)
        }
        fetchEpisode()
    })

    return (
        <>
            <h1>{episode?.name}</h1>
            <p>{episode?.air_date}</p>

            <div>
                {
                    episode?.characters.map((resident) => (
                        <li>
                            <p>{resident.name}</p>
                        </li>
                    ))
                }

            </div>
        </>
    )

}

export default EpisodeData;