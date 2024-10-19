const User = require("../model/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// const redisClient = require("../config/redis");

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, contact_no, address } = req.body;

    const existingUser = await User.findOne({ 
      $or:[{contact_no},{email}]
     });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      contact_no,
      address,
    });

    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role,contact_no: newUser.contact_no, email: newUser.email},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // await redisClient.set(`user:${email}`, JSON.stringify(user), "EX", 3600); // Cache user
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password Mismatched" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, contact_no: user?.contact_no, email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { role, name, email, phoneNumber } = req.body;

    const query = {};
    if (role) query.role = role;
    if (name) query.name = name;
    if (email) query.email = email;
    if (phoneNumber) query.phoneNumber = phoneNumber;

    // const redisKey = `user:${email}`;
    // const cachedUser = await redisClient.get(redisKey);
    // if (cachedUser) {
    //   return res.status(200).json(JSON.parse(cachedUser));
    // }

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cache the result
    // await redisClient.set(redisKey, JSON.stringify(user), "EX", 3600);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const email = req.body
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // const redisKey = `user:${email}`;
    // const cachedUser = await redisClient.get(redisKey);
    // if (cachedUser) {
    //   return res.status(200).json(JSON.parse(cachedUser));
    // }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cache the result
    // await redisClient.set(redisKey, JSON.stringify(user), "EX", 3600);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const { name, email, password, phoneNumber, address, role } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;
    if (role) updateData.role = role;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // await redisClient.del(`user_by_id:${userId}`);
    // await redisClient.del(`user_search_${JSON.stringify({ _id: userId })}`);

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Invalidate cache
    // await redisClient.del("all_users");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // const redisKey = "all_users";
    // const cachedUsers = await redisClient.get(redisKey);
    // if (cachedUsers) {
    //   return res.status(200).json(JSON.parse(cachedUsers));
    // }

    const users = await User.find({
      $or: [{ role: "coordinate" }, { role: "student" }],
    });
    // console.log(users);
    if (!users) return res.status(404).json({ message: "users not found" });
    // await redisClient.set(redisKey, JSON.stringify(users), "EX", 3600);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

