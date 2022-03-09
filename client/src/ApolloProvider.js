//ARCHIVO DE CONFIGURACION
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context'    //para pasar el token de auth a la request

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'//en produccion hay que cambiarlo, obviamente
})

const authLink = setContext(() => {

    const token = localStorage.getItem('jwtToken');

    return {
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    }

})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})



export default function Provider() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}



