import Link from "next/link";
import Datos from "../components/datos";

type ServerSideProps = {
    params:{
        id: string;
    }
};

//Llamada a la API desde el servidor y no desde el cliente al pedir el personaje
export async function getServerSideProps(props: ServerSideProps){
    const id = props.params.id;
    const res = await fetch(`https://swapi.dev/api/planets/${id}`);
    const json =await res.json();

    json.residents = await Promise.all(json.residents.map(async (url:string) => {
        const res = await fetch(url);
        const json = await res.json();
        return json.name;
    }));

    json.films = await Promise.all(json.films.map(async (url:string) => {
        const res = await fetch(url);
        const json = await res.json();
        return json.title;
    }));
    
    return {props: json};
};

type PlanetProps={
    name:string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
    residents: string[];
    films: string[];
    url: string;
    created: string;
    edited: string;
};

const Character = (props: PlanetProps) =>{
    return (
        <> 
            <Datos data={props}></Datos>
        </>
    );
};

export default Character