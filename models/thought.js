const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId},
    reactionBody: {type: String, require: true, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: () => Date.now()}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true , maxLength: 280 },
    createdAt: {type: Date, default: () =>  Date.now()},
    username: {type: String, required: true},
    reactions: [reactionSchema],
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

thoughtSchema.virtual('formattedDate').get(function () {

    const d = this.createdAt.getDate();
    const m = this.createdAt.getMonth()+1;
    const y = this.createdAt.getFullYear();

    return `${y}-${m}-${d}`;
});

reactionSchema.virtual('formattedDate').get(function () {

    const d = this.createdAt.getDate();
    const m = this.createdAt.getMonth()+1;
    const y = this.createdAt.getFullYear();

    return `${y}-${m}-${d}`;
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;