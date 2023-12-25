const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const businessSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    field: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    website: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    }
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;