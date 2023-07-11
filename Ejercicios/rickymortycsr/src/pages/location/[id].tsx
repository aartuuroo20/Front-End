import { GetServerSideProps } from "next";
import Location from "@/components/location";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: {
            id
        }
    } 
}

const InvLocation: React.FC<{id: string}> = ({id}) => {

    return (
        <div>
            <h1>Location</h1>

            <Location id={id}></Location>
        </div>
    )
}

export default InvLocation;