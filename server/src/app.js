import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import notesRoutes from './routes/notes.routes.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes
app.use(usersRoutes);
app.use(notesRoutes);

export default app;