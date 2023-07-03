import { EliminateAll, FilasTabla, Formulario, HeadersTabla, InputAñadir, InputsNombreDNI, Papelera, Principal, TablaFormulario } from "@/styles/styledcomponents";
import { useState } from "react";

type Fila = {
    nombre: string;
    DNI: string;
}

const Table = () => {
    const [nombre, setNombre] = useState<string>("");
    const [DNI, setDNI] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    const [fila, setFila] = useState<Fila[]>([]);

    function addData(){
        const dniRegex = new RegExp("^[0-9]{8}[A-Za-z]$");
        const nameRegex = new RegExp("^[a-zA-Z-ZÀ-ÿ].*[s.]*$");
        if(!dniRegex.test(DNI)){
            alert("DNI no válido");
            return;
        }
        if(!nameRegex.test(nombre)){
            alert("Nombre no válido");
            return;
        }

        if(fila.find((data) => data.DNI === DNI) != null){
            alert("DNI ya agregado");
            return;
        }
        setFila([...fila, {nombre: nombre, DNI: DNI}]);
        setNombre("");
        setDNI("");
    }
    return (
        <Principal>
            <TablaFormulario>
                <HeadersTabla>Nombre</HeadersTabla>
                <HeadersTabla>DNI</HeadersTabla>
                <HeadersTabla></HeadersTabla>

                {fila.map((f) => (
                            <>
                                <FilasTabla>{f.nombre}</FilasTabla> 
                                <FilasTabla>{f.DNI}</FilasTabla> 
                                <Papelera src="/papelera.png" onClick={(e) => setFila(fila.filter((fila1) => fila1.DNI !== f.DNI || fila1.nombre !== f.nombre) )}></Papelera>
                            </>))}
            </TablaFormulario>
            <Formulario>
                <InputsNombreDNI type="text" shadow="0px 5px 5px 0px" placeholder="Introduce nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <InputsNombreDNI type="text" shadow="0px 5px 5px 0px" placeholder="Introduce DNI" value={DNI} onChange={(e) => setDNI(e.target.value)}/>
                <InputAñadir type="submit" backgroundColor="#f0f0f0" value="Añadir" onClick={(e) => addData()}/>
                <EliminateAll type="submit" backgroundColor="#f0f0f0" value="Eliminar toda la tabla" onClick={(e) => setFila([])}/>
            </Formulario>
        </Principal>
        
    )
}

export default Table

