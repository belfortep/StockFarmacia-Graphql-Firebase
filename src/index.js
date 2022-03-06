//----------------------------------------IMPORTS----------------------------------------
const express = require('express');
const app = express();
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const authenticate = require('./middlewares/auth');


//----------------------------------------CONFIGURACION----------------------------------------

app.set('port', process.env.PORT || 3000);

//----------------------------------------MIDDLEWARES----------------------------------------

app.use(morgan('dev'))

app.use(express.json())

app.use(authenticate)

//----------------------------------------RUTA GRAPHQL----------------------------------------

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

//----------------------------------------ABRIENDO SERVIDOR----------------------------------------

app.listen(app.get('port'), () => {

  console.log(`Servidor en el puerto ${app.get('port')}`);

});













