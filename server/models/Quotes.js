const {Schema, model} = require('mongoose')
const QuotesSchema = new Schema({
    content: String,
    author: String,
})
module.exports = model('quote', QuotesSchema)