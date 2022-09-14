const { Schema, model } = require('mongoose');

const carSchema = new Schema(
    {
        model: {type: String},
        carClass: {type: String},
        make: {type: String},
        fuel_type: {type: String},
        city_mpg: {type: Number},
        combination_mpg: {type: Number},
        cylinders: {type: Number},
        transmission: {type: String},
        year: {type: Number},
        post: [{type: Schema.Types.ObjectId, ref: "post"}]
    },

    {
        timestamps: true,

    }
)

const carModel = model('car', carSchema)

module.exports = carModel;
