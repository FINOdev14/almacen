const reviewSchema = [`
  type Review{
    _id: String
    description: String
    noteId: Int
    note: Review_note
    productId: String
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    isRemove: Boolean
  }

  type Review_note{
    _id: String
    name: String
  }

  input Review_Filter{
    _id: String
    productId: String
  }
 
  

  input Review_Input{
    _id: String
    description: String
    noteId: Int
    productId: String
    collectionP: Boolean
  }

  type Query{
    Review_Get(filter: Review_Filter, option:Option):[Review]
    Review_Note:[Review_note]
    Review_Count(filter: Review_Filter):Int
  }

  type Mutation{
    Review_Save(reviewInput: Review_Input):ID
    Review_Delete(_id: String! ): Boolean
  }

`];
module.exports = reviewSchema;
//colletionP: [Product]