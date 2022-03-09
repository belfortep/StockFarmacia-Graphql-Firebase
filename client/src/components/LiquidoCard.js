import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'


export default function ComprimidoCard(props) {

    const handleDelete = (id) => {

        console.log('diste click a' + id)

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
                        <Button basic color='green' as={Link} to={`/comprimidos/${id}`}>
                            Editar
                        </Button>
                        <Button onClick={() => handleDelete(id)} basic color='red'>
                            Eliminar
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Card.Group>

    )
}


