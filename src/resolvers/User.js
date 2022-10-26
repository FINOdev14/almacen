const userModel = require('../Models/User');
const bcrypt = require('bcryptjs'); //encrypt password
const { handlePagination } = require('@codecraftkit/utils');

const User_update = async (_, { userInput }) => {
  try {
    if (userInput.password) {
      const salt = await bcrypt.genSalt(10);
      let { password } = userInput;
      userInput.password = await bcrypt.hash(password, salt); // use user password and to hash password
    }
    await userModel.findByIdAndUpdate(
      userInput._id,
      { $set: userInput },
      { new: true }
    );

    return userInput._id;
  } catch (e) {
    console.log('Error update' + e);
    return e;
  }
};

const User_get = async (_, { filter = {}, option = {} }) => {
  try {
    let query = { isRemove: false };
    let { _id, email } = filter;
    let { skip, limit } = handlePagination(option);

    if (_id) query._id = _id;
    if (email) query.email = { $regex: email, $Options: 'i' };

    const find = userModel.find(query);
    //console.log(await find);

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

const User_delete = async (_, { _id }) => {
  try {
    await userModel.findByIdAndUpdate(_id, {
      $set: { isRemove: true },
    });
    return true;
  } catch (e) {
    console.log('Error Delete' + e);
    return e;
  }
};

const User_count = async (_, { filter = {} }) => {
  try {
    const count = await User_get(_, { filter });
    return count.length;
  } catch (e) {
    console.log('Error count' + e);
    return e;
  }
};

module.exports = {
  Query: { User_get, User_count },
  Mutation: { User_update, User_delete },
};
