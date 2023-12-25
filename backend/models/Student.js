const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    field: {
        type: String,
        require: true
    },
    major: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    cpa: {
        type: Number,
        require: true
    },
    cert: {
        type: Number
    }
});
const Students = mongoose.model("Student", studentSchema);
module.exports = Students;