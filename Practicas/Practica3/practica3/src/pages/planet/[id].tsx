import Datos from "../component/datos"

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

const Planet = (props: PlanetProps) => {

    return(
        <>
            <div>
                <Datos />
            </div>            
        </>
    )
    
}

export default Planet