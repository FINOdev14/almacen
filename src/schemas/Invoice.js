const invoiceSchema = [`
  type Invoice{
    _id: String
    numInvoce: Int
    producto: [Producto]
    numProduct: Int
    infoInvoice: [InfoInvoice]
    Total:Int
    Iva:Int
    iva: Float
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    isRemove: Boolean
  }
  type Producto{
    productId: String
    nameProduct: String
    quantity: Int
    valortotal: Int
    
  }
  type InfoInvoice{
    productId: String
    valorTotalUnit: Int
    
  }
  

  input Invoice_Filter{
    _id: String
    numInvoce: Int
  }

  input Producto_Input{
    productId: String
    nameProduct: String
    valorProduct: Int
    quantity: Int
    valortotal: Int
  }

  input Invoice_Input{
    _id: String
    numInvoce: Int
    producto: [Producto_Input]
    numProduct: Int
    pricetotal: Float
    iva: Float
  }

  type Query{
    Invoice_Get(filter: Invoice_Filter, option:Option): [Invoice]
    Invoice_Count(filter: Invoice_Filter):Int
  }

  type Mutation{
    Invoice_Save(invoiceInput: Invoice_Input):ID
    Invoice_Delete(_id: String!): Boolean
  }

`];

module.exports = invoiceSchema;