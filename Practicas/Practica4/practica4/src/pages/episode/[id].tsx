import Episode from "@/components/episode";
import { GetServerSideProps, NextPage } from "next";


export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query;
    return {
      props: {
        id
      }
    }
}

const Page: NextPage<{id:string}> = ({id}) => {
    return (
      <>
        <Episode id={id}/>
      </>
    )
  }
  
  export default Page;


  