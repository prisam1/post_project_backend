const express = require("express");
const {
  addProject,
  getProjects,
  getProjectById,
  postComments,
  searchUsersAndProjects,
  getProjectsByUserId
} = require("../controller/projectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//------------------------------------
router.post("/", authMiddleware, addProject);
router.get("/", getProjects);
router.get("/search", searchUsersAndProjects);
router.get("/:userId", getProjectsByUserId);
router.get("/:id", getProjectById);
router.post("/:id/comments", authMiddleware, postComments);

module.exports = router;
