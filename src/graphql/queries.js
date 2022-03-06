const { GraphQLList, GraphQLID } = require('graphql');
const { UserType, ComprimidoType, LiquidoType } = require('./types');
const { db } = require('../db/firebase');


const comprimidos = {
    type: new GraphQLList(ComprimidoType),  //devolveme una lista de Usuarios
    async resolve() {

        const querySnapshot = await db.collection('comprimidos').get()

        const comprimidos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()//los 3 puntos, traeme TODOS los datos
        }))

        return comprimidos

    }
}

const comprimido = {
    type: ComprimidoType,
    description: 'Obtener un comprimido',
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, args) {
        const doc = await db.collection('comprimidos').doc(args.id).get()
        const data = {
            id: doc.id,
            ...doc.data()
        }

        return data

    }
};

const liquidos = {
    type: new GraphQLList(LiquidoType),
    description: "Obtener todos los liquidos",
    async resolve() {

        const querySnapshot = await db.collection('liquidos').get()

        const liquidos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()//los 3 puntos, traeme TODOS los datos
        }))

        return liquidos

    }
}

const liquido = {
    type: LiquidoType,
    description: "Get a post",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, args) {
        const doc = await db.collection('liquidos').doc(args.id).get()
        const data = {
            id: doc.id,
            ...doc.data()
        }

        return data

    }
};

const users = {
    type: new GraphQLList(UserType),
    description: "Obtener todos los usuarios",
    async resolve(_, args) {

        const querySnapshot = await db.collection('usuarios').get()

        const usuarios = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()//los 3 puntos, traeme TODOS los datos
        }))

        return usuarios

    }
}

const user = {
    type: UserType,
    description: "Obtener un usuario",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, args) {
        const doc = await db.collection('usuarios').doc(args.id).get()
        const data = {
            id: doc.id,
            ...doc.data()
        }

        return data

    }
}



module.exports = { users, user, comprimido, comprimidos, liquido, liquidos }