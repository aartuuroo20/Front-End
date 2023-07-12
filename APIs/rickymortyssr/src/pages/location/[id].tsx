import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import Link from "next/link";

type QueryResponse = {
    location: {
        name: string,
        dimension: string,
        residents: {
            id: string,
            name: string
        }[]
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const query = gql`
        query location($id: ID!) {
            location(id: $id) {
                name
                dimension
                residents{
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
            location: queryAnswer.data.location
        }
    }
}

const location: React.FC<QueryResponse> = ({location}) => {
    return (
        <div>
            <h1>Location</h1>
            <div>
                <h2>{location.name}</h2>
                <p>{location.dimension}</p>
                <p>
                    {
                        location.residents.map((resident) => (
                            <div key={resident.id}>
                                <Link href={`/character/${resident.id}`}>{resident.name}</Link>
                            </div>
                        ))
                    }
                </p>


            </div>
        </div>
    )
}

export default location