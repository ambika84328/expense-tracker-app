const User = require("../models/user")
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const user = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUser = async(req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.verifyUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token (optional, for authentication)
        //const token = jwt.sign({ id: user._id, email: user.email }, "your_secret_key", { expiresIn: "1h" });

        // Send response
        res.status(201).json({ message: "Sign-in successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

exports.updateUser = async(req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.update({ username, email, password });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async(req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}