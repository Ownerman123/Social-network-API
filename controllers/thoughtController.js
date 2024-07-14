const { User, Thought } = require('../models');


module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
       
      
      res.json(thoughts);
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId}).populate('thoughts').populate('friends');
      if(!user){

        return res.status(404).json({message: "no user with that id found!"});
        
      }
      const thought = await Thought.create({thoughtText: req.body.thoughtText, username: user.username});
      console.log(user);
      user.thoughts.push(thought._id);
      await user.save();
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }

      res.status(200).json({message: "thought deleted!"});
      
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // takes a body with a reactiondata key that holds the reaction body and the username
  async addReaction(req, res) {
    try {
        
        const thought = await Thought.updateOne(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        );

        if(!thought){
            res.status(404).json({message: "no Thought with that id found!"})
        }
     
        res.json(thought);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
        
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId,
            {$pull: {reactions: {reactionId: req.body.reactionId}}}
        );
        
        
        res.json(thought);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  }


};