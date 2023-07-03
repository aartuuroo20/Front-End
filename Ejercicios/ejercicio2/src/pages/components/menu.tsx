import { PlanetMenu } from "@/styles/stylescomponents";
import Link from "next/link";
import { useEffect, useState } from "react";



type PageProps = {
    planets: {name: string, url: string}[]
}

const Menu = (props: PageProps) => {

    return (
        <>
             <PlanetMenu>
            {
                props.planets.map(planet => (
                    <>
                    <Link className="planeta" href={`http://localhost:3000/planet/${planet.url}`}>{planet.name}</Link><br />
                    </>
                ))
            }
            </PlanetMenu>

        </>
    )

};

export default Menu