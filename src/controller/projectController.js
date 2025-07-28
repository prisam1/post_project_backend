const Project = require("../models/Project.js");
const Comment = require("../models/Comment.js");
const User = require("../models/User.js");

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

exports.searchUsersAndProjects = async (req, res) => {
  try {
    const query = req.query.q;

    const projects = await Project.find({
      title: { $regex: query, $options: "i" },
    }).populate("creator", "username");

    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("-password");

    res.status(200).json({ projects, users });
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

exports.getProjectsByUserId = async (req, res) => {
  try {
    const projects = await Project.find({
      creator: req.params.userId,
    }).populate("creator", "username email");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects by user" });
  }
};

exports.postComments = async (req, res) => {
  const comment = new Comment({
    projectId: req.params.id,
    userId: req.user.id,
    comments: req.body.message,
  });
  await comment.save();
  res.status(201).json(comment);
};
