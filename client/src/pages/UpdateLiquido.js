import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react';
import LiquidoCard from '../components/LiquidoCard';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';
export default function UpdateLiquido() {
    const FETCH_LIQUIDOS_QUERY = gql`
{
    liquidos{
    id nombre cantidad fechaVencido
}
}


`
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_LIQUIDOS_QUERY);

    if (user) {


        return (
            <Navigate to='/liquidos' />
        )
    }
    else {
        return (
            <Navigate to={'/login'} />
        )
    }


}





