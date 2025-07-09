const Project = require("../models/Project.js");
const Comment = require("../models/Comment.js");
const User = require("../models/Comment.js");

exports.addProject = async (req, res) => {
  const project = new Project({ ...req.body, creator: req.user.id });
  await project.save();
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("creator", "username avatar");
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "creator",
    "username avatar"
  );
  const comments = await Comment.find({ projectId: project._id }).populate(
    "userId",
    "username avatar"
  );
  res.json({ project, comments });
};

exports.searchProject = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Query is required" });
  const regex = new RegExp(q.toString(), "i");
  const users = await User.find({ username: regex }).select("_id username bio");
  const projects = await Project.find({
    $or: [{ title: regex }, { description: regex }],
  })
    .populate("creator", "username")
    .select("_id title description creator");
  res.json({ users, projects });
};

exports.postComments = async (req, res) => {
  const comment = new Comment({
    projectId: req.params.id,
    userId: req.user.id,
    comments: req.body.message,
  });
  await comment.save();
  console.log("->", req.body.message);

  res.status(201).json(comment);
};
