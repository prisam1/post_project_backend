const User = require('../models/User.js');
 

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
}

exports.updateUser = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
  res.json(user);
}

exports.searchUser = async (req, res) => {
  const query = req.query.q;
  const users = await User.find({ username: new RegExp(query, 'i') }).select('username bio avatar');
  res.json(users);
}
 