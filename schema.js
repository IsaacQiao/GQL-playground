const fetch = require('node-fetch')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} = require('graphql')


const x = fetch(
  'https://jsonplaceholder.typicode.com/users/1'
).then(response => response.json()).then(json => console.log(json))

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: '...',

  fields: () => ({
    name: { type: GraphQLString },
    catchPhrase: { type: GraphQLString },
    bs: { type: GraphQLString }
  })
})



const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    },
    companystring: {
      type: GraphQLString,
      resolve: json => JSON.stringify(json.company)
    },
    company: {
      type: CompanyType
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetch(
          `https://jsonplaceholder.typicode.com/users/${args.id}`
        ).then(response => response.json())
      }
    })
  })
})