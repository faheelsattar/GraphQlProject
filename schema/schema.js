const graphql = require("graphql")
const _ = require("lodash")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql

//dummy data for now
let moviestore=[
    {id:"1", name:"Hulk", genre:"action"},
    {id:"2", name:"Ironman", genre:"action"},
    {id:"3", name:"Thor", genre:"action"},
]
const movietype = new GraphQLObjectType({
    name: "movie",
    fields:()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        genre:{type: GraphQLString}
    })
})

const rootquery= new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        movie:{
            type:movietype,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //prvoisison on grapiql
                return _.find(moviestore, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:rootquery
})