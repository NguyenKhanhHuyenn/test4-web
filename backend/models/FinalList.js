const mongoose = require('mongoose');
const Student = require('./Student');
// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const resultSchema = new mongoose.Schema({
    _id: {
        type: String,
        ref: Student,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    birthday: {
        type: String
    },
    sex: {
        type: String,
    },
    major: {
        type: String
    },
    position: {
        type: String
    },
    business: {
        type: String
    }
});


const Results = mongoose.model("internship_results", resultSchema);
module.exports = Results;