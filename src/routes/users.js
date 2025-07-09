const express = require("express");
const {
  getUser,
  updateUser, 
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

//------------------------------------
router.get("/me",authMiddleware, getUser);
router.put("/me",authMiddleware, updateUser);  

module.exports = router;
