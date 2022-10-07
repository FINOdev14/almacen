const product = require('../Models/Product');
const review = require('../Models/Review');
const  { generateId, handlePagination } = require('@codecraftkit/utils');



const Product_Create = async (_, { productInput }) => {
  try {
    const ID = generateId();
    const {
      categoyId,nameProduct, 
      description, valorProduct, 
      totalNumber, onSale
    } = productInput;
    await new product({
      _id:ID,categoyId,
      nameProduct,description,
      valorProduct,totalNumber,onSale
    }).save();
    return ID;
  } catch (e) {
    return e;
  }
};

const Product_Update = async(_, { productInput }) => {
  try {
    await product.findByIdAndUpdate(
      productInput._id, {$set: productInput},{new: true});
    return productInput._id;
  } catch (e) {
    return e;
  }
};

const Product_Save = async (_, { productInput }) => {
  try {
    const actions = {
      create: Product_Create,
      update: Product_Update
    };
    const action = productInput._id ? 'update' : 'create';
    return await actions[action](_, { productInput });

  } catch (e) {
    return e;
  }
};

const Product_Get = async (_, {filter={}, option={}})=>{
  try {
    
    let query = {isRemove: false};
    let {_id, nameProduct, valorProduct} = filter;
    let {skip, limit} = handlePagination(option);

    if(_id)query._id = _id;
    if(nameProduct)query.nameProduct = {$regex: nameProduct, $Options:'i'};
    if(valorProduct)query.valorProduct = valorProduct;
    console.log(query);
    let aggregate = [
      {
        $match: query,          
      },{
          $lookup:{
            from: "category",
            localField: "categoyId",
            foreignField: "_id",
            as: "category",
            pipeline:[
              {
                $match: {
                  isRemove: false
                }
              }
            ]
          }
      },{
          $unwind:{
            path:"$category",
            preserveNullAndEmptyArrays:true,

          }
      },{
          $lookup:{
            from: "review",
            localField: "_id",
            foreignField: "productId",
            as: "review"
          }
      },{
        $unwind:{
          path:"$review",
          preserveNullAndEmptyArrays:true
        }
      }
    ];

    if(skip) product.push({skip: skip});
    if(limit)product.push({limit: limit}); 

    return await product.aggregate(aggregate);
  } catch (e) {
    return e;
  }
};

const Product_Delete = async (_, { _id })=>{
  try {
    await product.findByIdAndUpdate(_id, {$set: {isRemove: true, onSale:false, totalNumber:0}});
    await review.updateMany({productId:_id},{$set:{isRemove:true}})
    return true;

  } catch (e) {
    return e;
  }
};

const Product_Count = async (_, { filter={} }) => {
  try {
    const count = await Product_Get(_, {filter});
    return count.length
  } catch (e) {
    return e;
  }
};



const Product_Stock_Update  = async (_, {_id,newcount}) => {
  let vl = await product.findById(_id);
  let cont = vl.totalNumber;
  let total = cont + newcount;

  await product.findByIdAndUpdate(_id,{$set: {totalNumber: total}});
  
  let ID =   vl._id;
  return ID;
}

module.exports = {
  Query:{
    Product_Count,
    Product_Get,
    Product_Stock_Update
  },
  Mutation:{
    Product_Save,
    Product_Delete
  }
};