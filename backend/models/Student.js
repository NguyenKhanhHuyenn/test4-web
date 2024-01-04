const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    cpa: {
        type: Number,
        required: true
    },
    cert: {
        type: Number
    }
});
const Students = mongoose.model("Student", studentSchema);
module.exports = Students;