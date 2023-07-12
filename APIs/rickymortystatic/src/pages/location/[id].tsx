import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type LocationProps = {
  id: string;
  name: string;
  dimension: string;
  residents: {name: string, id: string}[]
};

type Info = {
    count: number
}

type QueryResponse = {
    locations: {
        results: LocationProps;
        info: Info
    }
}

type QueryResponse2 = {
    location: LocationProps
}

interface Params extends ParsedUrlQuery {
    id: string;
  }

export const getStaticPaths: GetStaticPaths = async () => {

    const client = getClient()
    let paths = []

    const query = gql`
        query locations{
            locations {
                info{
                    count
                }
            }   
        }
    `

    const queryAnswer = await client.query<QueryResponse>({
        query,
    })

    for(let i = 1; i<=queryAnswer.data.locations.info.count; i++) {
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
    query location($id: ID!) {
        location(id: $id) {
            name
            dimension
            residents {
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
      location: data.location,
    },
  };
};

const Location: React.FC<QueryResponse2> = ({ location }) => {
  return (
    <div>
       <h1>{location.name}</h1>
        <h2>{location.dimension}</h2>
        <h3>Residents:</h3>
        <ul>
            {location.residents.map((resident) => (
                <li key={resident.id}>
                    <Link href={`/character/${resident.id}`}>{resident.name}</Link>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default Location;