const { generateId, handlePagination } = require('@codecraftkit/utils');

const invoice = require('../Models/invoice');

const Invoice_Create = async (_, { invoiceInput }) => {
  try {
    const ID = generateId();

    const contentProduct = ({
      productId,
      nameProduct,
      valorProduct,
      quantity,
      valortotal,
    } = invoiceInput.producto);

    let count = await contentProduct.length;
    let ivaporcen = invoiceInput.iva;
    let Product= [];
    let total=0;
    let B = 0;let A = 1; 
    for (let i = 0; i < count; i++) {
      let productId = await contentProduct[i].productId;

      let valorTotalUnit =
      await contentProduct[i].valorProduct*
      await contentProduct[i].quantity;

      Product.push({productId,valorTotalUnit});
      }
    let countTotal = Product.length;
    let actotal = 0;
    for (let j = 0; j < countTotal; j++) {
      let valorTotalProduct = 
      Product[B].valorTotalUnit;

      actotal = valorTotalProduct + actotal;
      total   = actotal;
      B++; A++; 
    }

    let { numInvoce, numProduct, pricetotal,Total,
      Iva,iva,infoInvoice } = invoiceInput;
    
     let ivat = (actotal*ivaporcen/100);
      Total = actotal;
      Iva = ivat;
      infoInvoice=Product
    await new invoice({
      _id: ID,
      numInvoce,
      producto: contentProduct,   
      numProduct,
      pricetotal,
      infoInvoice,
      Total,
      Iva,
      iva,
    }).save();
    return ID;
  } catch (e) {
    return e;
  }
};

const Invoice_Update = async (_, { invoiceInput }) => {
  try {
  
   
    await invoice.findByIdAndUpdate(
      invoiceInput._id,
      { $set: invoiceInput },
      { new: true }
    );
    return invoiceInput._id
  } catch (e) {
    return e;
  }
};

const Invoice_Save = async (_, { invoiceInput }) => {
  try {
    
    const actions = {
      create: Invoice_Create,
      update: Invoice_Update,
    };

    const action = invoiceInput._id ? 'update' : 'create';
    
    return await actions[action](_, { invoiceInput });
  } catch (e) {
    return e;
  }
};


const Invoice_Get = async (_, { filter = {}, option = {} }) => {
  try {
    let query = { isRemove: false };
    const find = invoice.find(query);

    let { _id, numInvoce } = filter;
    let { skip, limit } = handlePagination(option);

    if (_id) query._id = _id;
    if (numInvoce) query.numInvoce = numInvoce;


    if(skip){find.skip(skip)};
    if(limit){find.limit(limit)}    

    return await find.exec();
  } catch (e) {
    return e;
  }
};

 



const Invoice_Delete = async (_, { _id }) => {
  try {
    await invoice.findByIdAndUpdate(_id, {
       $set: { isRemove: true } 
    });
    
    return true;
  } catch (e) {
    return e;
  }
};

const Invoice_Count = async (_, { filter = {} }) => {
  try {
    const count = await Invoice_Get(_, { filter });
    return count.length;
  } catch (e) {
    return e;
  }
};

module.exports = {
  Query: {
    Invoice_Get,
    Invoice_Count,
  },
  Mutation: {
    Invoice_Save,
    Invoice_Delete,
  },
};
