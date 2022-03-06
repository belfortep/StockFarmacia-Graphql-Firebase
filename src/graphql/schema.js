const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, user, comprimido, comprimidos, liquido, liquidos } = require('./queries')
const { createComprimido, register, login, deleteComprimido, updateComprimido } = require('./mutations')

const QueryType = new GraphQLObjectType({    //objeto de consultas iniciales
    name: 'QueryType',
    description: 'Raiz de mis consultas',
    fields: {  //lo que puedo consultar, las funciones que puedo utilizar

        users: users,
        user: user,
        comprimido: comprimido,
        comprimidos: comprimidos,
        liquido: liquido,
        liquidos: liquidos

    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: 'Raiz de mis mutaciones',
    fields: {
        register: register,
        login: login,
        createComprimido: createComprimido,
        updateComprimido: updateComprimido,
        deleteComprimido: deleteComprimido
    }
})

//las consultas solo piden datos, las mutaciones cambian

const schema = new GraphQLSchema({

    query: QueryType,
    mutation: MutationType

})

module.exports = schema