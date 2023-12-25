const mongoose = require('mongoose');
const Business = require('./Business');
// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const positionSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    business: {
        type: String,
        ref: Business,
        required: true
    },
    capacity: {
        type: Number,
    },
    require: {
        type: String, // Move it here, outside of the object
    },
    cpa_required: {
        type: Number,
    }
});


const Positions = mongoose.model("Position", positionSchema);

module.exports = Positions;