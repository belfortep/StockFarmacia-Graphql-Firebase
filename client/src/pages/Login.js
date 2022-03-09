import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'


export default function Login() {

    const context = useContext(AuthContext)//aca tengo el user, la funcion login y la funcion logout
    const navigate = useNavigate();
    const [values, setValues] = useState({

        username: '',
        password: ''

    })

    const onChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

    }
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            if (result) {
                context.login(result.data.login)
                navigate('/')
            }
        },
        variables: values
    })

    const onSubmit = async (e) => {

        e.preventDefault();

        loginUser()



    }







    return (
        <div >
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>

                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    type="text"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                />
                <Button type='submit' primary>Login</Button>

            </Form>
        </div>
    )
}


const LOGIN_USER = gql`

    mutation login(
        $username: String!
        $password: String!
    )   {
        login(username: $username, password: $password)
    }


`