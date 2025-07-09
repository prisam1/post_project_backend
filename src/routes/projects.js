const express = require("express");
const {
  addProject,
  getProjects,
  getProjectById,
  postComments,
  searchProject,
} = require("../controller/projectController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//------------------------------------
router.post("/", authMiddleware, addProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/:id/comments", authMiddleware, postComments);
router.get("/search", searchProject);

module.exports = router;
