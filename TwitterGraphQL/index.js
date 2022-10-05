const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { maskErrors } = require("graphql-errors");
const { graphql } = require("graphql");
const { PORT } = require("./config");

const app = express();

maskErrors(schema)

app.use(
    "/graphql", graphqlHTTP({
        schema,
        graphiql: true
    })
)

graphql(schema, '{ mostLikedTweet(screen_name: "canada") { tweet_text likes } }').then((response) => {
    console.log(JSON.stringify(response.data));
  });
  
app.listen(PORT || 4001, () =>{
    console.log("App is running")
})