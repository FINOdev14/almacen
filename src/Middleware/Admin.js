const userModule = require('../Models/User');

module.exports = async function (req, res, next) {
  try {
    //Get user information by id
    
    const user = await userModule.findOne({
      _id: req.user.id,
    });
    console.log(user);
    if (user.role === 0) {
      return res.status(403).json({
        msg: 'Admin resources acess denied',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};
