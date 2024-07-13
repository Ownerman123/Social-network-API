const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId},
    reactionBody: {type: String, require: true, maxLength: 280},
    username: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, deffault: () => Date.now()}
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true , maxLength: 280 },
    createdAt: {type: Date, default: () =>  Date.now()},
    username: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    reactions: [reactionSchema],
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;