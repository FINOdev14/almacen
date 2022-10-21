const { generateId, handlePagination } = require('@codecraftkit/utils');

const InvoiceModel = require('../Models/invoice');

const Invoice_create = async (_, { invoiceInput = {} }) => {
  try {
    let { ivaPercentage, products = [], subtotal = 0 } = invoiceInput;

    if (!products.length) throw new Error('PRODUCTS_ARE_REQUIRED');

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      product.subtotal = product.price * product.quantity;
      subtotal += product.subtotal;
    }
    
    const number = await InvoiceModel.countDocuments();
    const totalIva = subtotal * (ivaPercentage / 100);
    const total = subtotal + totalIva;

    const ID = generateId();
    const newInvoice = await new InvoiceModel({
      _id: ID,
      number: number + 1,
      ivaPercentage,
      subtotal,
      totalIva,
      total,
      products,
    }).save();

    return newInvoice._id;
  } catch (e) {
    return e;
  }
};

const Invoice_get = async (_, { filter = {}, option = {} }) => {
  try {
    let query = { isRemove: false };

    let { _id, numInvoce } = filter;
    let { skip, limit } = handlePagination(option);

    if (_id) query._id = _id;
    if (numInvoce) query.numInvoce = { $regex: numInvoce, $options: 'i' };

    const find = InvoiceModel.find(query);

    if (skip) {
      find.skip(skip);
    }
    if (limit) {
      find.limit(limit);
    }

    return await find.exec();
  } catch (e) {
    return e;
  }
};

const Invoice_delete = async (_, { _id }) => {
  try {
    await invoice.findByIdAndUpdate(_id, {
      $set: { isRemove: true },
    });

    return true;
  } catch (e) {
    return e;
  }
};

const Invoice_count = async (_, { filter = {} }) => {
  try {
    const count = await Invoice_Get(_, { filter });
    return count.length;
  } catch (e) {
    return e;
  }
};

module.exports = {
  Query: {
    Invoice_get,
    Invoice_count,
  },
  Mutation: {
    Invoice_create,
    Invoice_delete,
  },
};
