const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const ADMIN_API_KEY = '8265'; 

exports.signup = async (req, res) => {
    const { username, email, password, role, secret_key } = req.body;

    try {
      
        if (role === 'admin') {
            if (secret_key !== ADMIN_API_KEY) {
                return res.status(400).json({ message: 'Invalid admin API key' });
            }
        }

      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

      
        const user = new User({ username, email, password: hashedPassword, role: role || 'user' });

        await user.save();

        res.status(200).json({ status: "Account successfully created", status_code: 200, user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!role) {
            return res.status(400).json({ status: "Role is required", status_code: 400 });
        }

        const user = await User.findOne({ username, role });

        if (!user) {
            return res.status(401).json({ status: "Incorrect username/password or role provided. Please retry", status_code: 401 });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: "Incorrect username/password provided. Please retry", status_code: 401 });
        }

      
        const token = jwt.sign({ user_id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ status: "Login successful", status_code: 200, user_id: user._id, access_token: token });
    } catch (error) {
        console.error('Login error:', error); 
        res.status(500).json({ message: error.message });
    }
};


