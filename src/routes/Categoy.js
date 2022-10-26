const express = require('express');
const router = express.Router();
const categoryModule = require('../Models/Category');
const userModule = require('../Models/User');
const auth = require('../Middleware/Auth');
const adminAuth = require('../Middleware/Admin');

const { check, validationResult}= require('express-validator');

//@route POST api/category
//@access Private admind
router.post('/',[
  check('name', 'Name is required').trim().not().isEmpty()
], auth, adminAuth, async(req,res) => {
  const user = await userModule.findOne({
    _id: req.user.id,
  });
  res.send(user);
})
module.exports = router
