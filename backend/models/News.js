const mongoose = require('mongoose');
const Business = require("./Business")
// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const newsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    business: {
        type: String,
        ref: Business,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    require: {
        type: String,
        required: true
    },
    profit: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;