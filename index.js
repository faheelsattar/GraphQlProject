const express = require("express")

const schema = require("./schema/schema")
//makes the express interact with graphql 
//we use below module to define a single endpoint for all grphql requests
const app = express()
const graphqlHTTP = require("express-graphql") 

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(3000, ()=> console.log("server is up and running"))