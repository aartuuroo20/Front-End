import EpisodeData from "@/components/episode"
import { GetServerSideProps } from "next"

type ServerSideProps = {
    id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id
    return {
        props: {
            id
        }
    }
}

const episode = (props: ServerSideProps) => {
    return ( 
        <>
            <EpisodeData id={props.id}></EpisodeData>
        </>
    )
}

export default episode