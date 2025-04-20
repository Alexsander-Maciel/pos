const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const authSchema = require('./schemas/authSchema');
const authResolver = require('./resolvers/authResolver');
require('dotenv').config();

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: authSchema,
    rootValue: authResolver,
    graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
});