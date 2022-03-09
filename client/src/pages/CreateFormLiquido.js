import gql from 'graphql-tag'
import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useMutation } from '@apollo/react-hooks'


export default function CreateFormLiquido() {
    const [values, setValues] = useState({

        nombre: "",
        cantidad: 0,
        fechaVencido: ""

    })


    const FETCH_LIQUIDOS_QUERY = gql`
{
    liquidos{
    id nombre cantidad fechaVencido
}
}


`
    const CREATE_LIQUIDO_MUTATION = gql`

    mutation createLiquido(
    $nombre: String!
    $cantidad: Int!
    $fechaVencido: String!
    ) {
        createLiquido( liquido:{ nombre: $nombre, cantidad: $cantidad, fechaVencido: $fechaVencido})
    }

`

    const [newLiquido, { loading }] = useMutation(CREATE_LIQUIDO_MUTATION, {
        update(proxy, result) {//proxy significa que guarda los datos en la cache, permitiendo que utilice las query despues
            if (result) {
                const data = proxy.readQuery({
                    query: FETCH_LIQUIDOS_QUERY
                })
                data.liquidos = [result.data.createLiquido, ...data.liquidos]
                proxy.writeQuery({ query: FETCH_LIQUIDOS_QUERY, data })
            }
        },
        variables: values
    })



    async function onSubmit(e) {
        values.cantidad = parseInt(values.cantidad)
        e.preventDefault();

        newLiquido()

        setValues({
            nombre: '',
            cantidad: 0,
            fechaVencido: ''
        })

    }

    const onChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const { user } = useContext(AuthContext)
    if (user) {
        return (
            <Form onSubmit={onSubmit}>
                <h2>Crea un Liquido</h2>
                <Form.Field>
                    <Form.Input type='text' placeholder="Nombre..." name="nombre" onChange={onChange} value={values.nombre} />
                    <Form.Input type='date' onChange={onChange} name="fechaVencido" value={values.fechaVencido} />
                    <Form.Input type='number' onChange={onChange} name="cantidad" value={values.cantidad} min="0" />
                    <Button type='submit' color='teal'>Confirmar</Button>
                </Form.Field>
            </Form>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }

}
