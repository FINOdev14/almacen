const  { generateId, handlePagination } = 
require('@codecraftkit/utils');
const { create } = require('../Models/invoice');
const invoice = require('../Models/invoice');

const Invoice_Create = async (_, { invoiceInput }) =>{
  try {
    const ID = generateId();
    const contentProduct = {
      productId,nameProduct,
      valorProduct,quantity,
      valortotal
    } = invoiceInput.producto
    const {
      numInvoce,
     numProduct,
      pricetotal,iva
    } = invoiceInput;
    let sumproduct = contentProduct[0].valorProduct*contentProduct[0].quantity;
    
    //console.log(invoiceInput.producto);
    await new invoice({_id:ID,numInvoce,
        producto:contentProduct,numProduct,
      pricetotal,iva}).save();
      console.log(contentProduct[0].valorProduct*contentProduct[0].quantity);
      return ID
  } catch (e) {
    return e;
  }
}

const Invoice_Update = async (_, { invoiceInput }) =>{
  try {
    await invoice.findByIdAndUpdate(
      invoiceInput._id,{$set: invoiceInput},
      {new:true});
  } catch (e) {
    return e;
  }
}

const Invoice_Save = async (_, { invoiceInput }) => {
  try {
    const actions = {
      create: Invoice_Create,
      update: Invoice_Update
    };

    const action = invoiceInput._id ? 'update': 'create';
    return await actions[action](_, { invoiceInput });
  } catch (e) {
    return e;
  }
}

const Invoice_Get = async (_, { filter={}, option={} })=>{
  try {
    let query  = {isRemove: false};
    let {_id, numInvoce} = filter;
    let {skip, limit} = handlePagination(option);

    if(_id) query._id = _id;
    if(numInvoce) query.numInvoce = numInvoce;

    const find = invoice.find(query);

    if(skip){find.skip(skip)};
    if(limit){find.limit(limit)};

    return await find.exec();
  } catch (e) {
    return e;
  }
};

const Invoice_Delete = async (_,{_id})=>{
  try {
    await invoice.findByIdAndUpdate(_id, {$set: {isRemove:true}});
    return true;
  } catch (e) {
    return e;
  }
};

const Invoice_Count = async (_, {filter={}})=> {
  try {
    const count = await Invoice_Get(_, {filter});
    return count.length
  } catch (e) {
    return e;
  }
};

module.exports = {
  Query:{
    Invoice_Get,
    Invoice_Count
  },Mutation:{
    Invoice_Save,
    Invoice_Delete
  }
}