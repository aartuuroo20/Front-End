import { useEffect, useState } from "react";

type GetResponse = {
  id: string;
  name: string;
  image: string;
  status: string;
}[];

type GetResponseCharacter = {
  id: string;
  name: string;
  image: string;
  status: string;
};

const Characters = () => {
  const [characters, setCharacters] = useState<GetResponse>([]);
  const [character, setCharacter] = useState<GetResponseCharacter | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character?page=1");
      const data = await response.json();
      setCharacters(data.results);
    };
    getCharacters();
  }, []);

  const getCharacterID = async (id: number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    setCharacter(data);
  };

  return (
    <div>
      <h1>Characters</h1>

      <div>
        <input type="text" placeholder="Search" onChange={(e) => getCharacterID(parseInt(e.target.value))}/>
      </div>

    {
        character ? (
            <div>
                <img src={character.image} alt={character.name} />
                <h2>{character.name}</h2>
                <p>{character.status}</p>
                <button onClick={() => setCharacter(null)}>Back to List</button>
            </div>
        ) : (
            <ul>
                {
                    characters.map((character) => (
                        <li key={character.id}>
                            <img src={character.image} alt={character.name} />
                            <h2>{character.name}</h2>
                            <p>{character.status}</p>
                        </li>
                ))}
            </ul>
        )
    }
    </div>
  );
};

export default Characters;
