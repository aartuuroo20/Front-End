import Episode from "@/components/episode";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: {
            id
        }
    } 
}

const InvEpisode: React.FC<{id: string}> = ({id}) => {

    return (
        <div>
            <h1>Episode</h1>

            <Episode id={id}></Episode>
        </div>
    )
}

export default InvEpisode;