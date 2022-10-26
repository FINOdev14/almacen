const userSchema = [
  `
type User{
  _id:      String
  name:     String
  email:    String
  password: String
  avatar:   String
  role:     Int
  history:  [String]
  createdAt: GraphQLDateTime
  updatedAt: GraphQLDateTime
  isRemove: Boolean
}

input User_filter{
  _id: String
  email: String
}

input User_Input{
  _id:      String
  name:     String
  email:    String
  password: String
  avatar:   String
  role:     Int
  history:  [String]
}

type Query{
  User_get(filter: User_filter, option:Option):[User]
  User_count(filter: User_filter):Int
}
type Mutation{
  User_update(userInput: User_Input):ID
  User_delete(_id: String!): Boolean
}

`,
];
module.exports = userSchema;
