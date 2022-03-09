import React, { useState } from 'react'
import { Card, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

export default function ComprimidoCard(props) {

    const navigate = useNavigate()
    const [values, setValues] = useState({

        id: ''

    })

    const DELETE_COMPRIMIDO_MUTATION = gql`

    mutation deleteComprimido($id: ID!)
     {
        deleteComprimido(id: $id)
            
        
            
        
    }

    
`
    const FETCH_COMPRIMIDOS_QUERY = gql`
{
    comprimidos{
    id nombre cantidad fechaVencido
}
}


`

    const [deleteComprimido] = useMutation(DELETE_COMPRIMIDO_MUTATION, {
        update(proxy, result) {
            if (result) {
                navigate('/update')
                const data = proxy.readQuery({
                    query: FETCH_COMPRIMIDOS_QUERY
                });
                data.comprimidos = data.comprimidos.filter(p => p.id !== values.id);
                proxy.writeQuery({ query: FETCH_COMPRIMIDOS_QUERY, data });

            }
        },
        variables: values
    })

    const handleDelete = async (id) => {

        await setValues({
            id
        })



        await deleteComprimido()

    }

    const { nombre, cantidad, fechaVencido, id } = props.comprimido

    return (
        <Card.Group>
            <Card fluid>
                <Card.Content>

                    <Card.Header>{nombre}</Card.Header>

                    <Card.Description>
                        Cantidad : {cantidad}
                    </Card.Description>
                    <Card.Description>
                        Fecha de Vencimiento : {moment(fechaVencido).fromNow()}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green' as={Link} to={'/createComprimido/' + id}>
                            Editar
                        </Button>
                        <Button onClick={() => { setValues({ id: id }); handleDelete(id) }} basic color='red'>
                            Eliminar
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Card.Group>

    )
}





