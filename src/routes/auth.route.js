const express = require('express');
const router = express.Router();
const jsonWebtoken = require('jsonwebtoken'); // to generate token
const bcrypt = require('bcryptjs'); //encrypt password
// chexk validation for request
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar'); //get user image by email
const { generateId } = require('@codecraftkit/utils');
const auth = require ('../Middleware/Auth');
// Models
const userModel = require('../Models/User');

//@route POST api/user
//@desc  User Information
//@access Private 
router.get('/', auth, async(req,res)=>{
  try {
    // get user information by id
    const user = await userModel.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    console.log(err.message);
    res.status(500).send('Server Error')
  }
})
//@route POST api/user/register
//@desc Register user
//@access Public
router.post(
  '/register',
  [
    //validation
    check('name', 'Names is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //get name and email and password from request
    const { name, email, password } = req.body;
    try {
      //Check if user already exist
      let user = await userModel.findOne({ email });

      //If user exist
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }
      // If not exist
      // get image from grava
      const avatar = gravatar.url(email, {
        s: '200', //Sixe
        r: 'pg', //Rate
        d: 'mm',
      });

      //create user object
      user = new userModel({
        _id: generateId(),
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10); // generate salt contains 10
      //save password
      user.password = await bcrypt.hash(password, salt); // use user password and to hash password
      //save user in data base
      await user.save();
      //payload to generate token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jsonWebtoken.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000, // for development for production it will 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (e) {
      console.log(e.message);
      res.status(500).send('Server error');
    }
  }
);

//@route POST api/user/login
//@desc Login user
//@access Public
router.post(
  '/login',
  [
    //validation for email and password
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is requerid').exists(),
  ],
  async (req, res) => {
    // if error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //if everything is good
    //get email and password from request body
    const { email, password } = req.body;

    try {
      // find user
      let user = await userModel.findOne({
        email,
      });

      // id user not found in dataBase
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        });
      }

      // Know user founded by email let's compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        });
      }

      //payload for jsonWebtoken
      const payload = {
        user: {
          id: user._id,
        },
      };

      jsonWebtoken.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (e) {
      console.log(e.message);
      res.status(500).send('Server error');
      return e;
    }
  }
);


module.exports = router;
