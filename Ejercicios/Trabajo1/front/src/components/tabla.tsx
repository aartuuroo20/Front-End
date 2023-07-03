import { useEffect, useState } from "react";
import { GridItem, RemoveRowButton, ColumnName, 
    InputsDiv, Menu, Wrapper, 
    AddColumnButton, AddRowButton, GridInput, Title, ErrorMessage } from "../styles/myStyledComponents";

const Tabla = () => {

    const [rows, setRows] = useState<string[][]>([]);
    const [columns, setColumns] = useState<{name: string, type: string}[]>([
        {name: "Name", type: "text"}, {name: "Age", type: "number"}, {name: "Birth Date", type: "date"}]);
    const [newRow, setNewRow] = useState<string[]>(["", "", ""]);
    const [columnName, setColumnName] = useState<string>("");
    const [columnType, setColumnType] = useState<string>("");
    const [errorShow, setErrorShow] = useState<boolean>(false);

    const saveTable = async () => {
        const url = window.location.href;
        const urlArray = url.split("?");
        const username = urlArray[1].split("=")[1];

        const response = await fetch("http://localhost:8080/saveTable", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                rows: rows,
                columns: columns
            })
        })

        if (response.ok) {
            const result = await response.json();
            console.log(result.table);
        } else {
            console.log("Error:", response.status);
        }
    }

    const loadTable = async () => {
        try {
          const url = window.location.href;
          const urlArray = url.split("?");
          const username = urlArray[1].split("=")[1];
      
          const response = await fetch(`http://localhost:8080/loadTable/${username}`);
      
          if (response.ok) {
            const result = await response.json();
            if (result.rows && result.columns) {
              setRows(result.rows);
              setColumns(result.columns);
              setNewRow(result.columns.map((column: { name: string, type: string }) => {
                if (column.type === "checkbox") {
                  return "No";
                }
                return "";
              }));
            } else {
              console.log("Error: response does not contain rows or columns property");
            }
          } else {
            console.log("Error:", response.status);
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        loadTable();
      }, []);

    return(
        <>
        <Menu>
            <Title>Table</Title>
            <Wrapper columns={columns.length+1}>

                {
                    <>
                    {columns.map((column, index) => (
                        <>
                        <ColumnName>
                            {column.name}
                         
                        </ColumnName>
                        </>
                    ))}
                    <div></div>
                    </>
                }

                {
                    rows.map((row, index) => (
                        <>
                            {
                                row.map(item => (
                                    <>
                                    <GridItem row={index+2}>{item}</GridItem>
                                    </>
                                ))
                            }
                            <RemoveRowButton row={index+2} column={columns.length+1} onClick={() => {
                                setRows(rows.filter((row, i) => (i!=index)));}}>
                                <i className="gg-trash"></i>

                            </RemoveRowButton>
                        </>
                    )) 
                }

                {
                    <>
                    {columns.map((column, index) => (
                        <>
                        <GridItem>
                        <GridInput value={newRow[index]} type={column.type} placeholder={column.name} row={rows.length+2} onChange={(e) => setNewRow(
                                newRow.map((value, i) => {
                                    if(i===index){
                                        if(column.type === "checkbox"){
                                            if(e.target.checked){
                                                return "Si";
                                            } else{
                                                return "No";
                                            }
                                        } else {
                                            return e.target.value;
                                        }
                                    } else {return value}
                                })
                            )}>
                         
                        </GridInput>
                        </GridItem>
                        </>
                    ))}
                    <AddRowButton row={rows.length+2} column={columns.length+1}
                    onClick={()=> {
                        setRows([...rows, newRow]);
                        setNewRow(newRow.map(value => {
                            if(value === "Si"){
                                return "Si";
                            } else if (value === "No") {
                                return "No";
                            }
                            return "";
                        }   
                            ))
                        }}>
                            <i className="gg-user-add"></i>
                        </AddRowButton>
                    </>
                }
  
            </Wrapper>

            <Title>Add columns</Title>

            <div style={{marginLeft: "10px"}}>
                <InputsDiv>
                        <input placeholder="column name" onChange={(e) => {setColumnName(e.target.value)}}></input>
                        <select onBlur={(e) => {setColumnType(e.target.value)}}>
                            <option>string</option>
                            <option>number</option>
                            <option>date</option>
                            <option>checkbox</option>
                        </select>
                        <AddColumnButton onClick={() => {
                            let checkName: boolean = false;
                            columns.forEach(column => {
                                if(column.name.toLowerCase() === columnName.toLowerCase()){
                                    checkName = true;
                                }
                            })
                            if(!checkName){
                                setColumns([...columns, {name: columnName, type: columnType}]);
                                let updateRows = rows;
                                updateRows.forEach(row => {
                                    if(row.length < columns.length+1){
                                        row.push("");
                                    }
                                    
                                });
                                console.log(updateRows)
                                setRows(updateRows)
                                if(columnType === "checkbox"){
                                    setNewRow([...newRow, "No"])
                                } else {
                                    setNewRow([...newRow, ""])
                                }
                                setErrorShow(false);
                            } else {
                                setErrorShow(true);
                            }
                        }}>Add column</AddColumnButton>
                        {
                            errorShow && <ErrorMessage>Nombre ya está en uso.</ErrorMessage>
                        }
                        <AddColumnButton onClick={() => saveTable()}>Guardar datos de la tabla</AddColumnButton>
                    </InputsDiv>
            </div>
            
        </Menu>
        </>
        
    )
}

export default Tabla;