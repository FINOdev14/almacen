const jwt = require('jsonwebtoken');

module.exports = function(req,res, next){
  //Get token from header
  const token = req.header('x-auth-token');
  
  //check if no token 
  if (!token){
    console.log(token);
    return res.status(400).json({
      msg: 'No token, auth denied'
    })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // set user id in req.user
    req.user =decoded.user;
    next()
  } catch (error) {
     req.status(400).json({
      msg:'Token is not valid'
    })
  }
}