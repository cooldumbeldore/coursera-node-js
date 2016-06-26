/**
 * Created by Administrator on 26/06/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    });

var dishSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        timestamps: true
    });

/*
dishSchema.post('create', function () {
    console.log("after creation");
});

dishSchema.pre('create', function () {
    console.log("before creation");
});
*/

var Dishes = mongoose.model("Dish", dishSchema);


module.exports = Dishes;
