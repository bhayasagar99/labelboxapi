const mongoose = require('mongoose');

const PictureSchema  = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    active :{
        type: String,
        default:"Y"
            }
});

module.exports = mongoose.model('picture',PictureSchema)