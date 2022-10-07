const categorySchema = [`
  type Category{
    _id: String
    nameCategory:String
    stock: Int
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    isRemove: Boolean
  }

  input Category_Filter{
    _id: String
    nameCategory:String
    stock: Int
  }

  input Category_Input{
    _id: String
    nameCategory:String
    stock: Int
  }

  type Query{
    Category_Get(filter: Category_Filter, option:Option):[Category]
    Category_count(filter: Category_Filter): Int
  }

  type Mutation{
    Category_Save(categoryInput: Category_Input):ID
    Category_Delete(_id: String!): Boolean
  }

`];
module.exports = categorySchema;