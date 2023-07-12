import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type CharacterProps = {
  id: string;
  name: string;
  gender: string;
  image: string
  location: {name: string, id: string}
  episode: {name: string, id: string}[]
};

interface CharacterPageProps {
  character: CharacterProps;
}

interface Params extends ParsedUrlQuery {
    id: string;
  }

export const getStaticPaths: GetStaticPaths = async () => {

  let page = true;
  let currentPage = 1;
  let fetchedCharacters = [];

  const client = getClient();

  const fetchCharactersIDs = async (page: number) => {
    const { data } = await client.query({
      query: gql`
        query Characters($page: Int) {
          characters(page: $page) {
            info {
              next
            }
            results {
              id
            }
          }
        }
      `,

      variables: {
        page,
      },
    });
    return data;
  };

    while (page) {
      const data = await fetchCharactersIDs(currentPage);
      fetchedCharacters.push(...data.characters.results);
      page = data.characters.info.next;
      currentPage++;
    }
  
    const paths = fetchedCharacters.map((character: any) => ({
      params: {
        id: character.id,
      },
    }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

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
  `;

  const client = getClient();

  const { data } = await client.query<{
    character: {
      name: string;
      gender: string;
      image: string;
    };
  }>({ query, variables: { id } });

  return {
    props: {
      character: data.character,
    },
  };
};

const Character: React.FC<CharacterPageProps> = ({ character }) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} height="100px" width="100px"/>
      <p> Gender: {character.gender}</p>
      <Link href={`/location/${character.location.id}`}> Location: {character.location.name}</Link>
      <p> Episodes: </p>
      <div>
       {character.episode.map((episode) => {
        return (
          <div key={episode.id}>
            <li>
              <Link href={`/episode/${episode.id}`}>{episode.name}</Link>
            </li>
          </div>
      )})}
      </div>
    </div>
  );
};

export default Character;