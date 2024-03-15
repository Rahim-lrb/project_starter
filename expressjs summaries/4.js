/*
! validation 
* manual
function validateUserInput(username, email, password) {
  if (username.length < 5) {
    return 'Username must be at least 5 characters long';
  }
  if (!isValidEmail(email)) {
    return 'Invalid email address';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return null; // Indicates no validation errors
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
* express validator 
const { check, validationResult } = require('express-validator');

app.post('/user', [
  check('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process the request if validation passes
  // ...
});


npm i express-validator
const expressValidator = require("express-validator")  in server
app.use(expressValidator)  => put it above the routes and below the others like.json()
router.post("/info", (req, res) => {
    req.check("id", 'the id is invalid').not().empty() ==> you want it not empty
    const errors = req.validationErrors()
    if (errors) {
        console.log(errors)
    } else {
        res.redirect("/info" + req.body.id)
    }
})


* from the model



* joi (schema based validation)
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const { error, value } = schema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}



* validator.js
const validator = require('validator');

if (!validator.isLength(username, { min: 5 })) {
  return 'Username must be at least 5 characters long';
}
if (!validator.isEmail(email)) {
  return 'Invalid email address';
}
if (!validator.isLength(password, { min: 8 })) {
  return 'Password must be at least 8 characters long';
}


* yup
- create validation middleware inside middlewares function
npm i yup
import { object } from ''yup
const validate( schema ) = (req, res, next) => {

    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    }
    catch(err) {
        return req.status(400).send(err.message)
    }
    
}
export default validate 

}
*/ 






/*
! built in validation in mongoose 
3 ways: in the controllers middlewares, or in the model (schema validation), using a library like joi
! custom validation
sometimes the built-in validators in mongoose aren't enough, You can also create custom validators to perform specific validation logic

tags: [String], tags: {
    type: array, 
    validation: {
        validator: function(value) {
            return v && v.length > 0
        },
        message: "it should at least have one tag"
    }
}
! async validator
Sometimes, validation requires asynchronous operations, like checking if a username is already taken from the database
username: {
    type: String,
    validate: {
    validator: async function(value) {
        const existingUser = await User.findOne({ username: value });
        return !existingUser;
    },
        message: 'Username already taken'
}
! validation error
In Mongoose, when a validation error occurs, it will trigger an error that you can catch and handle.
*/ 