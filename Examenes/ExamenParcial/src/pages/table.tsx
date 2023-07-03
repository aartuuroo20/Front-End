import { useState } from "react"

type Fila = {
    name: string,
    age: number | undefined,
    birth: string
}

const Table = () => {
    const [fila, setFila] = useState<Fila[]>([])
    const [name, setName] = useState<string>("")
    const [age, setAge] = useState<number>()
    const [birth, setBirth] = useState<string>("")

    function addColumn(){
   

    }


    function addData(){
        setFila([...fila, {name: name, age: age, birth: birth}]);
    }

    return(
        <div>
            <h1 className="Header">Table</h1>
            <div className="table">
                <h1 className="header-table">Name</h1>
                <h1 className="header-table">Age</h1>
                <h1 className="header-table">Birth Date</h1>
                <h1 className="header-table"></h1>

                {
                    fila.map((f) => (
                        <>
                                <p>{f.name}</p>
                                <p>{f.age}</p>
                                <p>{f.birth}</p>
                                <img className="imagenes" src="/papelera.png" width="20px" height="20px" onClick={(e) => setFila(fila.filter((aux: Fila) => aux.name !== f.name || aux.age !== f.age))}></img>
                        </>
                    ))
                }      

                <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input placeholder="age" value={age} onChange={(e) => setAge(parseInt(e.target.value))}></input>
                <input type="date" onChange={(e) => setBirth(e.target.value)}></input>
                <img className="imagenes" src="/añadir.png" width="20px" height="20px" onClick={(e) => addData()}></img>
    
            </div>
            <h2 className="Header">Add Columns</h2>
            <div>
                <input className="inputColumna" type="text" placeholder="column name"></input>
                <select className="selector">
                    <option selected value="string">String</option>
                    <option selected value="number">number</option>
                    <option selected value="date">date</option>
                    <option selected value="checkbox">checkbox</option>
                </select>
                <button className="boton" onClick={() => addColumn()}>Add Column</button>
            </div>
        </div>
    )

}

export default Table;