const { GraphQLDateTime } = require('graphql-iso-date');
const productSchema = [`
  scalar GraphQLDateTime

  type Product{
    _id: String
    categoyId: String
    nameProduct: String
    description: String
    valorProduct: Float
    totalNumber: Int
    onSale: Boolean
    category: Category
    review: Review
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    isRemove:  Boolean
  }

  

  input Product_Filter{
    _id: String
    nameProduct: String
    valorProduct: Float
  }

  input Option{
    limit: Int
    page: Int
  }

  input Product_Input{
    _id: String
    categoyId: String
    nameProduct: String
    description: String
    valorProduct: Float
    totalNumber: Int
    onSale: Boolean
  }

  type Query{
    Product_Count(filter: Product_Filter):Int
    Product_Get(filter: Product_Filter, option:Option): [Product]
    Product_Stock_Update(_id: String, newcount: Int): ID
    
  }
  type Mutation{
    Product_Save(productInput: Product_Input): ID
    Product_Delete(_id: String!):Boolean
  }
`];
module.exports = productSchema;