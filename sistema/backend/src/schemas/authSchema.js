const { buildSchema } = require('graphql');

const authSchema = buildSchema(`
    type User {
        id: ID!
        username: String!
        email: String!
        group_id: Int
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        login(identifier: String!, password: String!): AuthPayload
    }
`);

module.exports = authSchema;