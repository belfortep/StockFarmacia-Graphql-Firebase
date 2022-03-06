const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require("graphql");

const UserType = new GraphQLObjectType({ //creando tipo de objeto propio
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
})


module.exports = {
    UserType,
    ComprimidoType,
    LiquidoType
}