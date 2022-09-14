const { Schema, model, SchemaTypeOptions } = require('mongoose');


const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        // car
        author: { type: Schema.Types.ObjectId, ref: 'user' },
        comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
        carId: {type: Schema.Types.ObjectId, ref: 'car' }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const postModel = model('post', PostSchema);

module.exports = postModel;