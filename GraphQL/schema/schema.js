const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
        user: User
    }
    type User {
        name: String,
        age: Int
    }
`);

//resolver
const root = {
    user: () => {
        return { name: "peter", age: 24}
    }
}

module.exports = { schema, root };