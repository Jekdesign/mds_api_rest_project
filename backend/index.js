const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/route');

/*const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');*/


const app = express();
const port = process.env.PORT || 8080;
const URI = 'mongodb+srv://jech:jech@apimds-yf4w2.mongodb.net/test?retryWrites=true&w=majority' ;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


/*app.use(
  '/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);*/

mongoose
  .connect(
    URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(result => {
    app.listen(port);
    console.log('Your first node api is running on port: ' + port);
  })
  .catch(err => console.log(err));
  

module.exports = app;
