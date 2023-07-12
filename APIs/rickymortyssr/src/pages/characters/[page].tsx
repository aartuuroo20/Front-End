import getClient from "@/libs/client"
import { gql, useQuery } from "@apollo/client"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import React, { useEffect, useState } from "react"

type PageProps = {
    data: {
        info: {
            next: string | null
            prev: string | null
        }
        results: {
            id: string
            name: string
            image: string
        }[]
    },
    page: number
}

type QueryResponse = {
    characters: {
        info: {
            next: string | null
            prev: string | null
        }
        results: {
            id: string
            name: string
            image: string
        }[]
    }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { page } = context.query;
  
    const query = gql`
      query characters($page: Int!) {
        characters(page: $page) {
          info {
            next
            prev
          }
          results {
            id
            name
            image
          }
        }
      }
    `;
  
    const client = getClient();
  
    const { data } = await client.query<QueryResponse>({
      query,
      variables: {
        page: Number(page),
      },
    });
  
    return {
      props: {
        data: data.characters,
        page: Number(page),
      },
    };
  };


  const Characters: NextPage<PageProps> = (props: PageProps) => {
    return (
      <>
        <Link href={"/"}>Menu principal</Link>
        <h1>PERSONAJES RICK Y MORTY</h1>

        <div>
            <Link href={`/characters/${props.data.info.prev}`}>Prev</Link>
            <Link href={`/characters/${props.data.info.next}`}>Next</Link>
        </div>

        <div>
          <p> Nombre personaje: </p>{" "}
          <input type="text" placeholder="Nombre a buscar" onChange={() => console.log("NO ESTA HECHO")}></input>
        </div>
  
        <div>
          {props.data.results.map((character) => {
            return (
              <div>
                <Link key={character.id} href={`/character/[id]`} as={`/character/${character.id}`}>
                  <div>
                    <img src={character.image} alt={character.name}></img>
                    <h2> {character.name} </h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  };

    export default Characters;
