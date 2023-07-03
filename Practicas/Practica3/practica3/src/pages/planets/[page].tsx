import { Contenedor } from "@/styles/styledcomponents";
import Paginado from "../component/paginado"

type ServerSideProps = {
    params: {
        page: string;
    }
}

type PlanetList = {
    name: string;
    url: string;
  }

export async function getServerSideProps(props: ServerSideProps){
    let planetList: PlanetList[] = [];
    let res = await fetch(`https://swapi.dev/api/planets/?page=${props.params.page}`);
    const json = await res.json();

    json.results.forEach((planet:any) => {
        let idArr = planet.url.split("/");
        planetList.push({name:planet.name, url:idArr[5]})
    })

    return {
        props: {
            next: json.next,
            previous: json.previous,
            planets: planetList
        }
    }
}

type PageProps = {
    next: string | null,
    previous: string | null,
    planets: {
      name: string, 
      url: string
    }[]
  }

const Page = (props: PageProps) => {
    if(props.planets.length === 0) {
        return (
            <div>Cargando</div>
        )
    } else {
        return(
            <>
                <Contenedor>
                    <Paginado planets={props.planets} next={props.next} previous={props.previous} />
                </Contenedor>
            </>
        )
    }
}

export default Page