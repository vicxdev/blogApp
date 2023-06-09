import { Note } from '../models/Note.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../../client/media');

export const createNote = async (req, res) => {
    try {
        const { title, text } = req.body;
        const image = req.files ? req.files.image : null;
        let imageName = null;
        
        // If there's a image, handle it
        if (image) {
            const originalFileName = image.name;
            const ext = path.extname(originalFileName);
            const baseName = path.basename(originalFileName, ext);
            let newFileName = originalFileName;

            // Check if there is already an image with the same name
            const existingImage = await Note.findOne({
                where: {
                    imageName: originalFileName,
                },
            });

            // If an image with the same name exists, generate a new unique filename
            if (existingImage) {
                const timestamp = Date.now();
                newFileName = `${baseName}_${timestamp}${ext}`;
            }

            const filePath = path.join(uploadDir, newFileName);

            // Create the upload directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Move the uploaded file to the desired location
            await image.mv(filePath);

            imageName = newFileName;
        }

        const newNote = await Note.create({
            title,
            text,
            imageName: imageName,
        });

        res.json(newNote);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong creating a note',
        });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the notes',
        });
    }
};

export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);
        res.json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving a note',
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text } = req.body;
        const image = req.files ? req.files.image : null;

        const note = await Note.findByPk(id);
        note.title = title;
        note.text = text;

        // If there's a new image, handle it
        if (image) {
            const originalFileName = image.name;
            const ext = path.extname(originalFileName);
            const baseName = path.basename(originalFileName, ext);
            let newFileName = originalFileName;

            // Check if there is already an image with the same name
            const existingImage = await Note.findOne({
                where: {
                    imageName: originalFileName,
                },
            });

            // If an image with the same name exists, generate a new unique filename
            if (existingImage) {
                const timestamp = Date.now();
                newFileName = `${baseName}_${timestamp}${ext}`;
            }

            const filePath = path.join(uploadDir, newFileName);

            // Create the upload directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Move the uploaded file to the desired location
            await image.mv(filePath);

            // Delete the old image
            if (note.imageName && note.imageName !== newFileName) {
                const oldFilePath = path.join(uploadDir, note.imageName);
                fs.unlinkSync(oldFilePath);
            }

            note.imageName = newFileName;
        }
        await note.save();

        res.json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong updating a note',
        });
    }
};


export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByPk(id);

        if (note.imageName) {
            const oldFilePath = path.join(uploadDir, note.imageName);
            fs.unlinkSync(oldFilePath);
        }

        await note.destroy();
        
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong deleting a note',
        });
    }
};