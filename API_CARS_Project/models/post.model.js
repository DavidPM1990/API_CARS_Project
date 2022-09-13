const { Schema, model, SchemaTypeOptions } = require('mongoose');


const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'user' },
        comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const postModel = model('post', PostSchema);

module.exports = postModel;