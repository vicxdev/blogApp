import React, { useState } from 'react';
import axios from 'axios';

const NoteAddForm = ({ apiUrl, onCloseModal, notes }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleAddNote = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', text);
            formData.append('image', image);

            await axios.post(`${apiUrl}/notes`, formData);

            setTitle('');
            setText('');
            setImage(null);
            
            onCloseModal();
            if (notes.length < 1) {
                window.location.reload();
            }
        } catch (error) {
            console.log('Error adding note:', error);
        }
    };

    return (
        <form onSubmit={handleAddNote}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label">Text:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control"
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
    );
};

export default NoteAddForm;