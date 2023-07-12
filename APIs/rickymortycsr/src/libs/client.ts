import { ApolloClient, InMemoryCache } from "@apollo/client";

const CSRClient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql", //URL externa
    cache: new InMemoryCache(),
})

//CLientes internos como externos
export const getClient = () => {
    if(typeof window === undefined){
        return new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql", //URL interna
            cache: new InMemoryCache(),
        })
    }else{
        return CSRClient;
    }
}

export default getClient;