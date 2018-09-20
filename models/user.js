const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {type: String, required: true},
    google_ID: {type: String, required: true},
    thumbnail: {type: String},
    date_joined: { type: Date, default: Date.now("<YYYY-mm-dd>") },
});

module.exports = mongoose.model('Google_Users', User);
