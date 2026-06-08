const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Usuario ya existe' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user = new User({ email, password: hash });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;
        await user.save();

        res.json({ token });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ msg: 'Credenciales invalidas' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ msg: 'Credenciales invalidas' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;
        await user.save();
        
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;