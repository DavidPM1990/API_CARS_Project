const { Schema, model, SchemaTypeOptions } = require('mongoose');

const CommentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        post: { type: Schema.Types.ObjectId, ref: 'post' },
        comment: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const commentModel = model('comments', CommentSchema);

module.exports = commentModel;