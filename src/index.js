//----------------------------------------IMPORTS----------------------------------------
const express = require('express');
const app = express();
const morgan = require('morgan');
//const { graphqlHTTP } = require('express-graphql');
//const schema = require('./graphql/schema');
//const authenticate = require('./middlewares/auth');
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./graphql/types')
const resolvers = require('./graphql/resolvers')
//----------------------------------------CONFIGURACION----------------------------------------

app.set('port', process.env.PORT || 5000);

//----------------------------------------MIDDLEWARES----------------------------------------

app.use(morgan('dev'))

app.use(express.json())

module.exports = app

//----------------------------------------RUTA GRAPHQL----------------------------------------

/*app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))*/

//----------------------------------------ABRIENDO SERVIDOR----------------------------------------


async function start() {

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })

  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app: app })//gracias a apollo, al entrar al localhost/graphql, tengo una pantalla hecha

  app.use('*', (req, res) => res.status(404).send('Not found'))

  app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
    //console.log(new Date().toISOString())
  })

}

start()












