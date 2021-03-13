const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    id:{
        type: Number,
        required: true, 
        unique: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    overview:{
        type: String,
        required: true
    },
    releaseDate:{
        type: String,
        required: true
    },
    voteAverage:{
        type: Number,
        required: true
    },
    voteCount:{
        type: Number,
        required: true
    },
    language:{
        type: String
    },
    posterPath:{
        type: String
    },
    movieType:{
        type:String
    }
})

module.exports = mongoose.model('Movie', MovieSchema);