const {Schema, model} = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  }, {versionKey: false, timestamps: true})

const User = model("user", userSchema);

const signUpJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})

const loginJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})

  module.exports = {
      User,
      signUpJoiSchema,
      loginJoiSchema
  }


  