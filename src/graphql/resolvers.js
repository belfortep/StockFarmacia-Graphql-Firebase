const { db } = require('../db/firebase');
const authenticate = require('../middlewares/auth');
const { createJWTToken } = require('../util/auth')
const bcrypt = require('bcrypt')

const resolvers = {

    Query: {
        comprimidos: async () => {

            const querySnapshot = await db.collection('comprimidos').get()

            const comprimidos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()//los 3 puntos, traeme TODOS los datos
            }))

            return comprimidos

        },
        comprimido: async (_, args) => {
            const doc = await db.collection('comprimidos').doc(args.id).get()
            const data = {
                id: doc.id,
                ...doc.data()
            }

            return data
        },
        liquidos: async () => {
            const querySnapshot = await db.collection('liquidos').get()

            const liquidos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()//los 3 puntos, traeme TODOS los datos
            }))

            return liquidos
        },
        liquido: async (_, args) => {
            const doc = await db.collection('liquidos').doc(args.id).get()
            const data = {
                id: doc.id,
                ...doc.data()
            }

            return data
        },
        users: async () => {
            const querySnapshot = await db.collection('usuarios').get()

            const usuarios = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()//los 3 puntos, traeme TODOS los datos
            }))

            return usuarios
        },
        user: async (_, args) => {
            const doc = await db.collection('usuarios').doc(args.id).get()
            const data = {
                id: doc.id,
                ...doc.data()
            }

            return data
        },

    },

    Mutation: {
        createComprimido: async (_, args, context) => {

            const user = authenticate(context)

            const { fechaVencido, nombre, cantidad } = args.comprimido
            await db.collection('comprimidos').add({
                fechaVencido,
                nombre,
                cantidad
            })

            return 'Comprimido creado'
        },
        createLiquido: async (_, args, context) => {

            const user = authenticate(context)

            const { fechaVencido, nombre, cantidad } = args.liquido
            await db.collection('liquidos').add({
                fechaVencido,
                nombre,
                cantidad
            })

            return 'Liquido creado'
        },
        register: async (_, args) => {
            const { username, password } = args

            await db.collection('usuarios').add({
                username,
                password

            })

            const token = createJWTToken({ username: username })//creando el jwt



            return token
        },
        deleteComprimido: async (_, { id }, context) => {

            const user = authenticate(context)

            await db.collection('comprimidos').doc(id).delete()

            return 'Comprimido Eliminado';
        },
        deleteLiquido: async (_, { id }, context) => {

            const user = authenticate(context)

            await db.collection('liquidos').doc(id).delete()

            return 'Liquido Eliminado';
        },
        login: async (_, args) => {
            const querySnapshot = await db.collection('usuarios').where("username", "==", args.username).get()

            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()//los 3 puntos, traeme TODOS los datos
            }))

            var validPassword = await bcrypt.compare(args.password, users[0].password)

            if (validPassword) {

                var token = createJWTToken({ username: users[0].username })

            } else {
                token = 'error'
            }

            return token
        },
        updateComprimido: async (_, args, context) => {

            const user = authenticate(context)

            const { cantidad, fechaVencido, nombre } = args.comprimido

            await db.collection('comprimidos').doc(args.id).update({ cantidad, fechaVencido, nombre })

            return 'Comprimido actualizado'
        },
        updateLiquido: async (_, args, context) => {

            const user = authenticate(context)

            const { cantidad, fechaVencido, nombre } = args.liquido
            await db.collection('liquidos').doc(args.id).update({ cantidad, fechaVencido, nombre })

            return 'Liquido actualizado'
        },

    }

}


module.exports = resolvers