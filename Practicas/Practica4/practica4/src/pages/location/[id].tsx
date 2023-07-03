import Character from "@/components/charactersList";
import getClient from "@/libs/client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";



type LocationProps = {
    id: string;
    name: string;
    dimension: string;
    residents: {name: string, id: string}[]
  };
  
  interface LocationPageProps {
    location: LocationProps;
  }


export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query;

    const query = gql`
      query location($id: ID!){
        location(id: $id){
          name
          dimension
          residents{
            id
            name
          }
      }
    }`
  
    const client = getClient();
    const {data} = await client.query<{location: {name: string, dimension: string}, residents: {name: string, id: string}}>({ query, variables: {id} });
  
    return {
      props: {
        location: data.location
      }
    }
}

const LocationPage: React.FC<LocationPageProps> = ({ location }) => {
    return (
      <div className="recuadros">
        <h1>{location.name}</h1>
        <p>{location.dimension}</p>
        {location.residents.map((resident) => {return (
            <div key={resident.id}>
              <li>
                <Link className="todosLinks" href={`/character/${resident.id}`}>{resident.name}</Link>
              </li>
            </div>
        )})}
      </div>
    );
  };
  
  export default LocationPage;