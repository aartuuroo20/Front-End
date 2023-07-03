import styled from "styled-components";

export const Principal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const Headers = styled.h1`
    text-align: center;
    font-size: 30px;
`

export const DivDatos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 20px
`

export const Contenedor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
`

export const listado = styled.li`
    margin-top: 10px;
`

export const Botones = styled.button`
    background-color: black;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 10px 10px;
    margin-top: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    cursor: pointer;
`;