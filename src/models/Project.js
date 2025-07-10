const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  liveLink: String,
  gitHubLink:String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
 
module.exports = mongoose.model("Project", projectSchema);
