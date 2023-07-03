import styled from "styled-components";

type RowProps = {
    row: number,
    column?: number
}

type WrapProps = {
    columns: number,
}

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const Title = styled.h1`
    background: #3b82f6;
    color: white;
    font-weight: 700;
    padding: 20px;
    margin: 0px;
    border-radius: 15px;
`;

export const Wrapper = styled.div<WrapProps>`
    margin-left: 100px;
    margin-right: 100px;
    display: grid;
    grid-template-columns: ${(props: WrapProps) => `repeat(${props.columns}, 1fr)`};
    grid-gap: 0px;
    grid-auto-rows: minmax(30px, auto);
`;

export const GridItem = styled.div<RowProps>`
    grid-row: ${(props: RowProps) => props.row};
    border: 1px solid black;
    text-align: center;
    line-height: 60px;
    margin: 0;
    font-size: 18px;
`;

export const GridInput = styled.input<RowProps>`
    grid-row: ${(props: RowProps) => props.row};
    border: 1px solid black;
    border-radius: 15px;
    text-align: center;
    margin: 0;
    padding: 20px;
    font-size: 18px;
`;

export const ColumnName = styled.div`
    text-align: center;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    border: 1px solid black;
`;

export const AddRowsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 30px;
    text-align: center;
`;

export const InputsDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    gap: 10px;
`;

export const RemoveRowButton = styled.button<RowProps>`
    grid-row: ${(props: RowProps) => props.row};
    grid-column: ${(props: RowProps) => props.column};
    border: 1px solid black;
    cursor: pointer;
`;

export const AddRowButton = styled.button<RowProps>`
    grid-row: ${(props: RowProps) => props.row};
    grid-column: ${(props: RowProps) => props.column};
    border: 1px solid black;
    font-weight: 600;
    cursor: pointer;
`;

export const AddColumnButton = styled.button`
    font-weight: 600;
    border-radius: 5px;
    color: white;
    background: #3b82f6;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background: darkblue;
    }
`;

export const RemoveColumnButton = styled.button`
    border: 2px solid red;
    background-image: "/trash.png";
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 600;
    &:hover {
        background: red;
        color: white;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-weight: 600;
`;