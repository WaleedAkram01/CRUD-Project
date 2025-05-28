const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://WaleedAkram:Hr68sWda-ByuD7a@cluster0.i6rmr.mongodb.net/testapp1`)
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String
})

module.exports = mongoose.model('user', userSchema);