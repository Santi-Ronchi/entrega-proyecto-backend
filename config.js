require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || '127.0.0.1' ,
    NODE_ENV: process.env.ENV || 'development',
    MODO: process.env.MODO || 'CLUSTER',
    URL: process.env.MONGOURL,
    ETHERPASS: process.env.ETHERPASS,
    TWILIOSID: process.env.TWILIOSID,
    TWILIOTOKEN: process.env.TWILIOTOKEN,
    TWILIONUMBER: process.env.TWILIONUMBER,
}