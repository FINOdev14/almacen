const category = require('../Models/Category');
const { generateId, handlePagination } = require ('@codecraftkit/utils');

const Category_Create = async (_, { categoryInput }) => {
    try {
        const ID = generateId();
        const {nameCategory, stock} = categoryInput;
        await new category({
            _id:ID,nameCategory,stock
        }).save();

        return ID;
    } catch (e) {
        return e;
    }
};

const Category_Update = async (_, { categoryInput }) => {
    try {
        await category.findByIdAndUpdate(
            categoryInput._id, {
                $set: categoryInput
            },{new: true});

        return categoryInput._id;
    } catch (e) {
        return e;
    }
};

const Category_Save = async (_, { categoryInput }) => {
 try {

    const actions = {
        create: Category_Create,
        update: Category_Update
    };

    const action =
    categoryInput._id ? 'update' : 'create';
    return await actions[action](_, { categoryInput });
 } catch (e) {
    return e;
 }
};

const Category_Get = async (_, { filter={},option={}}) => {
    try {
        let query = { isRemove: false};
        let {_id, nameCategory, stock} = filter;
        let {skip, limit} = handlePagination(option);

        if(_id)query._id = _id;

        if(nameCategory)query.nameCategory = 
        {$regex: nameCategory, $Options:'i'};

        if(stock)query.stock = stock;

        const find = category.find(query);

        if(skip){find.skip(skip)};
        if(limit){find.limit(limit)};

        
        return await find.exec();
    } catch (e) {
        return e;
    }
};

const Category_Delete = async (_, {_id}) => {
    try {
        await category.findByIdAndUpdate(_id, {
            $set:{isRemove: true}
        });

        return true;
    } catch (e) {
        return e;
    }
};

const Category_count = async (_, {filter={}}) => {
    try {
        const count = 
        await Category_Get(_, {filter});
        
        return count.length
    } catch (e) {
        return e;
    }
};

module.exports = {
    Query:{
        Category_Get,
        Category_count
    },
    Mutation:{
        Category_Save,
        Category_Delete
    }
}