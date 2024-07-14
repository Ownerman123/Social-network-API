const mongoose = require('mongoose');
const {thoughtSchema} = require('./thought.js');


const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
    },
    thoughts: [{type:mongoose.SchemaTypes.ObjectId, ref: "Thought", required: true}],
    friends: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }],
    
})

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = mongoose.model('User', userSchema);

module.exports = User;