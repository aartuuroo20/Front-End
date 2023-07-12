import Character from "@/components/character";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: {
            id
        }
    } 
}

const InvCharacter: React.FC<{id: string}> = ({id}) => {

    return (
        <div>
            <h1>Character</h1>

            <Character id={id}></Character>
        </div>
    )

}

export default InvCharacter;