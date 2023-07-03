import { gql ,useQuery} from "@apollo/client";
import getClient from "../libs/client";
import React, {FC, useEffect, useState} from "react";
import Link from "next/link";


const Character = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [page, setPage] = useState<number>(1);

  const query = gql`
  query characters($page : Int!, $name : String){
    characters(page:$page, filter:{name:$name}){
          results{
              id
              name
              image
          }
      }
  }`
  const {loading,error,data, refetch} =  useQuery<{
    characters: {
      results: {
        name: string,
      }[]
    }
  }>(
    query, {
    variables: {
      page
    }
  });

  useEffect(() => {
    refetch({
      page,
      name: searchText
    })
  }, [page, searchText])

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error</div>

  return(
    <div>
      <div className="paginas">
        {data!.characters.results.map((character : any) => {
          return (
            <div key={character.id}>
              <img  src={character.image} alt={character.name} height="100px" width="100px"/>
              <Link  className="todosLinks" href={`/character/${character.id}`}>{character.name}</Link>
            </div>)
        }) }
      </div>
       
       <div>
          <button className="botones" onClick={() => setPage(page-1)}>Prev</button>
          <button className="botones" onClick={() => setPage(page +1)}>Next</button>
          <input className="inputs" type="text" value={searchText} id="textoNombre" placeholder="Buscar nombre" onChange={(e) => setSearchText(e.target.value)}></input>
       </div>
    </div>
  )
}

export default Character;