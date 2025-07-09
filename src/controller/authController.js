const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setAuthCookies } = require("../helper/auth.helper");
const User = require("../models/User.js");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isMobile = req.headers["user-agent"].includes("Mobi");
    let access_token = null;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    setAuthCookies(res, token, isMobile);

    if (isMobile) {
      access_token = token;
    }

    const data = {
      name: user.username,
      bio: user.bio,
      avatar: user.avatar,
      links: user.links,
      email: user.email,
    };

    res.status(200).json({ message: "Login successful", data, access_token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
