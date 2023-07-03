import { gql ,useQuery} from "@apollo/client";
import getClient from "../libs/client";
import React, {FC, useEffect, useState} from "react";
import Link from "next/link";


const Episode: FC<{id:string}> = ({id}) => {
    const query = gql`
    query episode($id: ID!){
      episode(id:$id){
        name
        air_date
        characters{
            id
            name
        }
      }
    }
    `
    
    const {loading,error,data} = useQuery<{
      episode: {
        name:string
        air_date:string
        characters:{
            id:string
            name:string
        }[]
      }
    }>(
      query,{
      variables: {
        id
      }
    }
    )
  
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error</div>

    return(
      <div className="recuadros">
        <h1>{data!.episode.name }</h1>
        <p>{data!.episode.air_date }</p>
        {
            data!.episode.characters.map((character : any) => {
                return (
                    <div key={character.id}>
                        <li>
                            <Link className="todosLinks" href={`/character/${character.id}`}>{character.name}</Link>
                        </li>
                    </div>)
            })
        }
        
      </div>
    )
  }
  
export default Episode;
