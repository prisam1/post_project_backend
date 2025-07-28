const express = require("express");
const {
  addProject,
  getProjects,
  getProjectById,
  postComments,
  searchUsersAndProjects,
  getProjectsByUserId,
} = require("../controller/projectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//------------------------------------
router.post("/", authMiddleware, addProject);
router.get("/", getProjects);
router.get("/search", searchUsersAndProjects);
router.get("/:id", getProjectById);
router.get("/user/:userId", getProjectsByUserId);
router.post("/:id/comments", authMiddleware, postComments);

module.exports = router;
