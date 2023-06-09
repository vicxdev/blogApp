import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { username } = req.body;

        // Validate the input
        if (!username) {
            return res.status(400).json({ message: 'Please provide a username' });
        }

        // Find or create the user by username
        let user = await User.findOne({ where: { username } });
        if (!user) {
            user = await User.create({ username });
        }

        // Generate a session token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            '3p1cS3cr3tK3y!',
            { expiresIn: '1h' }
        );

        // Store the session token in the client's cookie
        res.cookie('session_token', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
        });

        // Return the user data as response
        res.json({
            id: user.id,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};