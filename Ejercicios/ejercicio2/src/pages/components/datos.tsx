import Link from "next/link";
import { useEffect, useState } from "react";

type PlanetProps={
    data: {
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
    }
};

const Datos = (props: PlanetProps) => {

    return (
        <>
            <Link href="/">Ir a la lista</Link> <br />
            <div>
                <p>Nombre: {props.data.name}</p>
                <p>Diametro: {props.data.diameter}</p>
                <p>Periodo de rotacion: {props.data.rotation_period}</p>
                <p>Periodo orbital: {props.data.orbital_period}</p>
                <p>Gravedad: {props.data.gravity}</p>
                <p>Poblacion: {props.data.population}</p>
                <p>Clima: {props.data.climate}</p>
                <p>Terreno: {props.data.terrain}</p>
                <p>Superficie de agua: {props.data.surface_water}</p>
                {
                    props.data.residents.map(resident => (
                        <div key={resident}>
                            <p>Residente: {resident}</p>
                        </div>
                    ))
                }

                {
                    props.data.films.map(film => (
                        <>
                            <p>Pelicula: {film}</p>
                        </>
                    ))
                }
            </div>

        </>
    )

};

export default Datos