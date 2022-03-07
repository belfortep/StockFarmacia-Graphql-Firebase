
const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type UserType{
        id: ID
        username: String
        password: String
    }

    type ComprimidoType{
        id: ID
        nombre: String
        cantidad: Int
        fechaVencido: String
    }

    type LiquidoType{
        id: ID
        nombre: String
        cantidad: Int
        fechaVencido: String
    }

    type Query{
        comprimidos: [ComprimidoType]
        comprimido(id: ID): ComprimidoType   
        liquidos: [LiquidoType]
        liquido(id: ID): LiquidoType
        users: [UserType]
        user(id: ID): UserType
    }

    input ComprimidoInput{
        nombre: String
        cantidad: Int
        fechaVencido: String
    }

    input LiquidoInput{
        nombre: String
        cantidad: Int
        fechaVencido: String
    }

    input UserInput{
        username: String
        password: String
    }

    type Mutation{
        createComprimido(comprimido: ComprimidoInput!): String
        createLiquido(liquido: LiquidoInput!): String
        register(user: UserInput!): UserType
        deleteComprimido(id: ID!): String
        deleteLiquido(id: ID!): String
        login(username: String, password: String): String
        updateComprimido(id: ID!, comprimido: ComprimidoInput): String
        updateLiquido(id: ID!, liquido: LiquidoInput): String
    }


`


module.exports = { typeDefs }

/*const UserType = new GraphQLObjectType({ //creando tipo de objeto propio
    name: "UserType",
    description: "tipo de dato de usuario",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    })


});

const ComprimidoType = new GraphQLObjectType({
    name: "ComprimidoType",
    description: "tipo de dato de Comprimidos",
    fields: () => ({
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        cantidad: { type: GraphQLInt },
        fechaVencido: { type: GraphQLString }
    })
})

const LiquidoType = new GraphQLObjectType({
    name: "LiquidoType",
    description: "tipo de dato de Liquido",
    fields: () => ({
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        cantidad: { type: GraphQLInt },
        fechaVencido: { type: GraphQLString }
    })
})*/