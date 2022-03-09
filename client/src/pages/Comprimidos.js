import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react';
import ComprimidoCard from '../components/ComprimidoCard';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';
export default function Comprimidos() {
    const FETCH_COMPRIMIDOS_QUERY = gql`
            {
                comprimidos{
                id nombre cantidad fechaVencido
    }
    }


            `
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_COMPRIMIDOS_QUERY);

    if (user) {


        return (
            <Grid columns={3} divided>

                <Grid.Row>
                    {loading ? (
                        <h1>Cargando Comprimidos...</h1>
                    ) : (
                        data.comprimidos && data.comprimidos.map(comprimido => (
                            <Grid.Column key={comprimido.id} style={{ marginBottom: 20 }}>
                                <ComprimidoCard comprimido={comprimido} />
                            </Grid.Column>
                        ))
                    )}
                </Grid.Row>
            </Grid >
        )
    }
    else {
        return (
            <Navigate to={'/login'} />
        )
    }


}



