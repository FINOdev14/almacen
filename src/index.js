require ('dotenv').config();
const express = require('express');
const { ApolloServer } = require ('apollo-server-express');
const { connect } = require('mongoose');
const { makeExecutableSchema } = require('@graphql-tools/schema');

//conexion
const db = process.env.MONGODB;
//conexion base de datos
const connectDB = connect(db);

const app = express();
const PORT = process.env.PORT;
const typeDefs = require('./merge/mergeSchema');
const resolvers = require ('./merge/mergeResolvers');

app.get('/', (req,res)=>{
  res.send('Connect Ready');
});

async function start() {
  const schema = makeExecutableSchema({ typeDefs,resolvers});
  const apolloServer = new ApolloServer({
    schema
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app});

  app.listen(PORT,()=>{
    console.log(`🚀. Server ready at: http://localhost:${PORT}${apolloServer.graphqlPath}  .🚀`);
  });
}

start();