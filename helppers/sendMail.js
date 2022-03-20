const sgMail = require('@sendgrid/mail')
const { Unauthorized } = require("http-errors");

// require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async(mail) => {
  try {
    await sgMail.send(mail); 
    return true; 
  } catch (error) {
    throw new Unauthorized ("Your email couldn't be delivered")
  }
}

module.exports = sendMail;