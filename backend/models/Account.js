const Student = require('./Student');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Thêm useNewUrlParser và useUnifiedTopology vào options
const accountSchema = new mongoose.Schema({
    _id: {
        type: String,
        ref: Student,
        require: true
    },
    pass: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
});
const Accounts = mongoose.model("Account", accountSchema);
module.exports = Accounts;