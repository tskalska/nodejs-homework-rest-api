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
    avatar: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    }
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

const verificationEmailSchema = Joi.object({
  email: Joi.string().required(),
})

  module.exports = {
      User,
      signUpJoiSchema,
      loginJoiSchema,
      verificationEmailSchema
  }


  