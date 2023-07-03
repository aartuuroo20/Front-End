import styled from "styled-components";

type Props = {
    backgroundColor?: string;
    shadow?: string;
}

export const Principal = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

export const TablaFormulario = styled.div`
    width: 70%;
    height: 70%;
    background-color: grey;
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    border: 5px solid black;
`;

export const Formulario = styled.div`
    width: 30%;
    height: 70%;
`;

export const HeadersTabla = styled.h1`
    text-align: center;
    width: 100%;
    height: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const Papelera = styled.img`
    margin-top: 10px;
    margin-left: 30px;
    height: 50px;
    width: 50px;
`;

export const FilasTabla = styled.p`
    text-align: center;
    margin-bottom: 0px;
    margin-top: 0px;
    border: 2px solid black;
    font-size: 25px;
    padding: 20px;
`

export const InputsNombreDNI = styled.input<Props>`
    height: 50px;
    margin-left: 20px;
    box-shadow: ${props => props.shadow || "none"};
`;

export const InputAñadir = styled.input<Props>`
    margin-left: 20px;
    height: 50px;
    width: 100px;
    background-color: ${props => props.backgroundColor || "white"};
`

export const EliminateAll = styled.input<Props>`
    margin-top: 20px;
    margin-left: 20px;
    height: 50px;
    width: 150px;
    background-color: ${props => props.backgroundColor || "white"};
`