import gql from 'graphql-tag'
import React, { useState, useContext, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useMutation, useQuery } from '@apollo/react-hooks'



export default function CreateFormComprimido() {

    const { id } = useParams()

    const [values, setValues] = useState({

        nombre: "",
        cantidad: 0,
        fechaVencido: ""

    })


    const FETCH_COMPRIMIDOS_QUERY = gql`
{
    comprimidos{
    id nombre cantidad fechaVencido
}
}


`
    const FETCH_COMPRIMIDO_QUERY = gql`

    query comprimido(
        $id: ID!
    )  {
        comprimido(id: $id){
            nombre cantidad fechaVencido
        }
    }


`



    const CREATE_COMPRIMIDO_MUTATION = gql`

    mutation createComprimido(
    $nombre: String!
    $cantidad: Int!
    $fechaVencido: String!
    ) {
        createComprimido( comprimido:{ nombre: $nombre, cantidad: $cantidad, fechaVencido: $fechaVencido})
    }

`

    const UPDATE_COMPRIMIDO_MUTATION = gql`

    mutation updateComprimido(
    $nombre: String!
    $cantidad: Int!
    $fechaVencido: String!
    $id: ID!
    ) {
        updateComprimido(id: $id, comprimido:{ nombre: $nombre, cantidad: $cantidad, fechaVencido: $fechaVencido})
    }

`

    const { data } = useQuery(FETCH_COMPRIMIDO_QUERY, {

        variables: { id }
    })

    const [updateComprimido, { }] = useMutation(UPDATE_COMPRIMIDO_MUTATION, {
        update(proxy, result) {//proxy significa que guarda los datos en la cache, permitiendo que utilice las query despues
            if (result) {
                const data = proxy.readQuery({
                    query: FETCH_COMPRIMIDOS_QUERY
                })
                data.comprimidos = [result.data.createComprimido, ...data.comprimidos]
                proxy.writeQuery({ query: FETCH_COMPRIMIDOS_QUERY, data })
            }
        },
        variables: {
            id: id,
            nombre: values.nombre,
            cantidad: values.cantidad,
            fechaVencido: values.fechaVencido
        }
    })



    const [newComprimido, { loading }] = useMutation(CREATE_COMPRIMIDO_MUTATION, {
        update(proxy, result) {//proxy significa que guarda los datos en la cache, permitiendo que utilice las query despues
            if (result) {
                const data = proxy.readQuery({
                    query: FETCH_COMPRIMIDOS_QUERY
                })
                data.comprimidos = [result.data.createComprimido, ...data.comprimidos]
                proxy.writeQuery({ query: FETCH_COMPRIMIDOS_QUERY, data })
            }
        },
        variables: values
    })



    async function onSubmit(e) {
        values.cantidad = parseInt(values.cantidad)
        e.preventDefault();
        if (id) {

            updateComprimido()

        } else {
            newComprimido()
        }
        setValues({
            nombre: '',
            cantidad: 0,
            fechaVencido: ''
        })

    }

    const onChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

    }
    const getValue = async () => {
        if (id) {
            await setValues({
                nombre: data.comprimido.nombre,
                cantidad: data.comprimido.cantidad,
                fechaVencido: data.comprimido.fechaVencido,
            })
        }
    }



    useEffect(() => {

        getValue()

    }, [data])



    const { user } = useContext(AuthContext)
    if (user) {
        return (
            <Form onSubmit={onSubmit}>
                <h2>Crea un Comprimido</h2>
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
