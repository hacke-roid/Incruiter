const {connect} = require('mongoose')

const connectDb = (url) => connect(url)

module.exports = connectDb