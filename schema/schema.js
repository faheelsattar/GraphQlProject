const graphql = require("graphql")
const _ = require("lodash")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

//dummy data for now
let moviestore=[
    {id:"1", name:"Hulk", genre:"action", producerid:"1"},
    {id:"2", name:"Ironman", genre:"action",producerid:"2"},
    {id:"3", name:"Thor", genre:"action",producerid:"3"},
]

let producerStore=[
    {id:"1", name:"Norman", age: 32},
    {id:"2", name:"Clint", age:24},
    {id:"3", name:"Rug", age: 56},
]

const movietype = new GraphQLObjectType({
    name: "movie",
    fields:()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        genre:{type: GraphQLString},
        producer:{
            type:producertype,
            resolve(parent, args){
                return _.find(producerStore, {id: parent.producerid})
            }
        }
    })
})

const producertype = new GraphQLObjectType({
    name: "producer",
    fields:()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        age:{type: GraphQLInt}
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
        },
        producer:{
            type:producertype,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return _.find(producerStore, {id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:rootquery
})