import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type EpisodeProps = {
  id: string;
  name: string;
  air_date: string;
  characters: {name: string, id: string}[]
};

type Info = {
    count: number
}

type QueryResponse = {
    episodes: {
        results: EpisodeProps;
        info: Info
    }
}

type QueryResponse2 = {
    episode: EpisodeProps
}

interface Params extends ParsedUrlQuery {
    id: string;
  }

export const getStaticPaths: GetStaticPaths = async () => {

    const client = getClient()
    let paths = []

    const query = gql`
        query episodes{
            episodes {
                info{
                    count
                }
            }   
        }
    `

    const queryAnswer = await client.query<QueryResponse>({
        query,
    })

    console.log(queryAnswer.data.episodes.info.count)


    for(let i = 1; i<=queryAnswer.data.episodes.info.count; i++) {
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


};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  const query = gql`
    query episode($id: ID!) {
        episode(id: $id) {
            name
            air_date
            characters {
                id
                name
            }
        }
    }
  `;

  const client = getClient();

  const { data } = await client.query<QueryResponse2>({ query, variables: { id } });

  return {
    props: {
      episode: data.episode,
    },
  };
};

const Episode: React.FC<QueryResponse2> = ({ episode }) => {
  return (
    <div>
        <h1>{episode.name}</h1>
        <p>{episode.air_date}</p>
        <ul>
            {episode.characters.map((character) => (
                <li key={character.id}>
                    <Link href={`/character/${character.id}`}>{character.name}</Link>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default Episode;