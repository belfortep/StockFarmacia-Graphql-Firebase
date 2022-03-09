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

    const DELETE_LIQUIDO_MUTATION = gql`

    mutation deleteLiquido($id: ID!)
     {
        deleteLiquido(id: $id)
            
        
    }

    
`
    const FETCH_LIQUIDOS_QUERY = gql`
{
    liquidos{
    id nombre cantidad fechaVencido
}
}


`

    const [deleteLiquido] = useMutation(DELETE_LIQUIDO_MUTATION, {
        update(proxy, result) {
            if (result) {
                navigate('/updateLiquido')
                const data = proxy.readQuery({
                    query: FETCH_LIQUIDOS_QUERY
                });
                data.liquidos = data.liquidos.filter(p => p.id !== values.id);
                proxy.writeQuery({ query: FETCH_LIQUIDOS_QUERY, data });

            }
        },
        variables: values
    })

    const handleDelete = async (id) => {

        await setValues({
            id
        })

        await deleteLiquido()

    }

    const { nombre, cantidad, fechaVencido, id } = props.liquido

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
                        <Button basic color='green' as={Link} to={'/' + id}>
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