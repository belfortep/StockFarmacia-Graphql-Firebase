const { GraphQLString, GraphQLID, GraphQLInt } = require("graphql");
const { createJWTToken } = require("../util/auth");
const { db } = require('../db/firebase')
const bcrypt = require('bcrypt');


//recibo datos
const register = {

    type: GraphQLString,
    description: "Registra a un nuevo usuario y devuelve un token",
    args: {//argumentos a pasar

        username: { type: GraphQLString },
        password: { type: GraphQLString }

    },
    async resolve(_, args) {    //cuando se llame register, hago lo que tenga la funcion
        console.log(args)//args es como el request.body de las api

        const { username, password } = args

        await db.collection('usuarios').add({
            username,
            password

        })

        const token = createJWTToken({ username: username })//creando el jwt

        console.log(token)

        return token
    },

};

const login = {
    type: GraphQLString,
    description: 'Login and return token',
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },

    },
    async resolve(_, { username, password }) {

        const querySnapshot = await db.collection('usuarios').where("username", "==", username).get()

        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()//los 3 puntos, traeme TODOS los datos
        }))

        var validPassword = await bcrypt.compare(password, users[0].password)

        if (validPassword) {

            var token = createJWTToken({ username: users[0].username })

        } else {
            token = 'error'
        }

        return token

    }
};


const createComprimido = {
    type: GraphQLString,
    description: "Crea un nuevo Comprimido",
    args: {
        fechaVencido: { type: GraphQLString },
        nombre: { type: GraphQLString },
        cantidad: { type: GraphQLInt }
    },
    async resolve(_, { fechaVencido, nombre, cantidad }, { verifiedUser }) {

        if (!verifiedUser) throw new Error('Unauthorized');

        await db.collection('comprimidos').add({
            fechaVencido,
            nombre,
            cantidad
        })

        return 'Comprimido creado'

    }
};

const updateComprimido = {
    type: GraphQLString,
    description: "Actualiza un comprimido",
    args: {
        id: { type: GraphQLID },
        fechaVencido: { type: GraphQLString },
        nombre: { type: GraphQLString },
        cantidad: { type: GraphQLInt }
    },
    async resolve(_, { cantidad, fechaVencido, nombre, id }, { verifiedUser }) {

        if (!verifiedUser) throw new Error('Unauthorized');

        await db.collection('comprimidos').doc(id).update({ cantidad, fechaVencido, nombre })

        return 'Comprimido actualizado'

    }
};

const deleteComprimido = {
    type: GraphQLString,
    description: "Delete a Post",
    args: {
        id: { type: GraphQLID },

    },
    async resolve(_, { id }, { verifiedUser }) {

        if (!verifiedUser) throw new Error('Unauthorized');

        await db.collection('comprimidos').doc(id).delete()

        return 'Comprimido Eliminado';

    }
};





module.exports = { updateComprimido, deleteComprimido, createComprimido, login, register }