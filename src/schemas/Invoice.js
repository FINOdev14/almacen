const invoiceSchema = [
  `
  type Invoice{
    _id: String
    number: Int
    ivaPercentage: Int
    subtotal: Int
    products: [products]
    numProduct: Int
    totalIva: Int
    total: Int
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    isRemove: Boolean
  }
  type products{
    productId: String
    price: Int
    quantity:Int
  }

  

  input Invoice_Filter{
    _id: String
    numInvoce: Int
  }

  input products_Input{
    productId: String
    price: Int
    quantity:Int
  }

  input Invoice_Input{
    _id: String
    number: Int
    products: [products_Input]
    ivaPercentage: Int
    subtotal: Int
    numProduct: Int
    totalIva: Int
    total: Int
  }

  type Query{
    Invoice_get(filter: Invoice_Filter, option:Option): [Invoice]
    Invoice_count(filter: Invoice_Filter):Int
  }

  type Mutation{
    Invoice_create(invoiceInput: Invoice_Input):ID
    Invoice_delete(_id: String!): Boolean
  }

`,
];

module.exports = invoiceSchema;