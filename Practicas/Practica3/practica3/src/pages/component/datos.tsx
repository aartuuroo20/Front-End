import { DivDatos } from "@/styles/styledcomponents";
import { useEffect, useState } from "react";


type PlanetProps = {
        name: "",
        rotation_period: "",
        orbital_period: "",
        diameter: "", 
        climate: "", 
        gravity: "", 
        terrain: "", 
        surface_water: "", 
        population: "",
        residents: [""],
        films: [""] 
    
}

const Datos = () => {

    const [data, setData] = useState<PlanetProps>({
        name: "",
        rotation_period: "",
        orbital_period: "",
        diameter: "",
        climate: "",
        gravity: "",
        terrain: "",
        surface_water: "",
        population: "",
        residents: [""],
        films: [""]
    });

    const fetchPlanet = async () => {
        try {
            let x = window.location.pathname.split("/")[2];
            const res = await fetch(`https://swapi.dev/api/planets/${x}`);
            const json = await res.json();

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

            setData(json);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchPlanet();
    }, []);

    return(
        <>
            <DivDatos>
                <h1>Planet Data </h1>
                <p>Nombre: {data.name}</p>
                <p>Rotation Period: {data.rotation_period}</p>
                <p>Orbital Period: {data.orbital_period}</p>
                <p>Diameter: {data.diameter}</p>
                <p>Climate: {data.climate}</p>
                <p>Gravity: {data.gravity}</p>
                <p>Terrain: {data.terrain}</p>
                <p>Surface Water: {data.surface_water}</p>
                <p>Population: {data.population}</p>
                <p>Residents: {data.residents}</p>
                <p>Films: {data.films}</p>  
            </DivDatos>
        </>
    )
}

export default Datos