const { User, Thought } = require('../models');


module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const Users = await User.find().populate('friends').populate('thoughts');
      res.json(Users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a User
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('friends').populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriendToUser(req,res) {
    try {
        const user = await User.findOne({_id: req.params.userId}).populate("friends").populate('thoughts');
        if (!user) {
            console.log('User not found');
            res.status(404).json({message: 'no user with that id found!'})
            return;
          }

          if (user.friends.includes(req.params.friendId)) {
            console.log('Friend already added');
            res.status(409).json({message: 'User has already added this friend'
            })
            return;
          }
          user.friends.push(req.params.friendId);
          
          await user.save();
          res.status(201).json({message: "friend added sucessfully", updatedUser: user});
        
        user.save();
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

  },

  async removeFriendFromUser(req, res) {
    
    try{
    const user = await User.findByIdAndUpdate(
         req.params.userId, 
         { $pull:{friends: req.params.friendId}},
         { new: true}
).populate("friends").populate('thoughts');
    if (!user) {
        console.log('User not found');
        res.status(404).json({message: 'no user with that id found!'})
        return;
      }
      
      await user.save();
      res.status(201).json({message: "friend removed sucessfully", updatedUser: user});
    
    user.save();
} catch (err) {
    console.log(err);
    res.status(500).json(err)
}
  }

};
