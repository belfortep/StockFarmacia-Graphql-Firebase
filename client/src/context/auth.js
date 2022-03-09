import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
    if (decodedToken.exp * 1000 < Date.now()) { //exp, por si expiro
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({ //contexto

    user: null,
    login: (userData) => { },
    logout: () => { }

})

function authReducer(state, action) {   //las posibilidades del reducer

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }

}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)   //require mi funcion reducer y un estado inicial

    function login(userData) {
        localStorage.setItem("jwtToken", userData)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT'
        })
    }
    //value es lo que le paso a mis componentes
    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}
            {...props}
        />
    )

}

export { AuthContext, AuthProvider }
