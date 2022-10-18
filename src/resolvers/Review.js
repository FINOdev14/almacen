const review = require('../Models/Review');
const { generateId, handlePagination } = require('@codecraftkit/utils');

// U+2735, UTF-8: E2 9C B5
const note = {
"1":{_id:"1",  name: "✩"},"2":{_id:"2",  name: "✩✯"},
"3":{_id:"3",  name: "✩✯⭑"},"4":{_id:"4",  name: "✩✯⭑⭑"},
"5":{_id:"5",  name: "✩✯⭑⭑⭑"}
}

const Review_Create = async (_, { reviewInput }) => {
    try {
        const ID = generateId();

        const {
          description,noteId,productId
        } = reviewInput;

        await new review({
          _id:ID,description,
          noteId,productId
        }).save();

        return ID;
    } catch (e) {
        return e;
    }
};

const Review_Update = async (_, { reviewInput }) => {
    try {
        await review.findByIdAndUpdate(
          reviewInput._id, {
            $set: reviewInput
          },{new: true});

        return reviewInput.id;

    } catch (e) {
        return e;
    }
};

const Review_Save = async (_, { reviewInput }) => {
    try {
      const actions = {
        create: Review_Create,
        update: Review_Update
      }
      const action = reviewInput._id ? 'update' : 'create';

      return await actions[action](_,{reviewInput});
    } catch (e) {
        return e;
    }
};

const Review_Delete = async (_, { _id }) => {
  try {
    await review.findByIdAndUpdate(
      _id,{$set: {isRemove: true}});
      
    return true;
  } catch (e) {
    return e
  }
};

const Review_Get = async  (_, {filter={}, option={}}) => {
  try {
    let query = {isRemove:false};
    let {_id,productId} = filter;
    let {skip,limit} = handlePagination(option);

    if(_id)query._id = _id;
    if(productId)query.productId = productId;

    const find = review.find(query);

    if(skip){find.skip(skip)};
    if(limit){find.limit(limit)};

    let result = await find.exec();

    for (let noteFilter of result){
      noteFilter.note = note[noteFilter.noteId];
    }

    return result;
  } catch (e) {
    return e;
  }
};

const Review_Count = async (_, {filter={}}) => {
  try {
    const count = await Review_Get(_,{filter});
    return count.length; 
  } catch (e) {
    return e;
  }
};


const Review_Note = async () => {
  try {
    return Object.values(note);
  } catch (e) {
    return e;
  }
};

module.exports = {
  Query:{
    Review_Get,
    Review_Note,
    Review_Count
  },
  Mutation:{
    Review_Save,
    Review_Delete
  }
};