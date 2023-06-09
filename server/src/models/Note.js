import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Note = sequelize.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    imageName: {
        type: DataTypes.STRING,
    },
    text: {
        type: DataTypes.TEXT,
    },
});