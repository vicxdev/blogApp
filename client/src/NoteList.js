import React, { useEffect } from 'react';
import axios from 'axios';

const NoteList = ({ apiUrl, notes, setNotes, editedNotes, setEditedNotes, totalPages, currentPage, setCurrentPage, fetchNotes }) => {
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleEditNote = (noteId) => {
        setEditedNotes((prevEditedNotes) => ({
            ...prevEditedNotes,
            [noteId]: true,
        }));
    };

    const handleSaveNote = async (noteId) => {
        try {
            const editedNote = {
                title: editedNotes[noteId]?.title || notes.find((note) => note.id === noteId)?.title,
                text: editedNotes[noteId]?.text || notes.find((note) => note.id === noteId)?.text,
                image: editedNotes[noteId]?.image || notes.find((note) => note.id === noteId)?.imageName,
            };

            await axios.put(`${apiUrl}/notes/${noteId}`, editedNote, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            fetchNotes();
        } catch (error) {
            console.log('Error saving note:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`${apiUrl}/notes/${noteId}`);
            const updatedNotes = notes.filter((note) => note.id !== noteId);
            setNotes(updatedNotes);
    
            // Adjust the current page if the deleted note was on the last page
            const notesPerPage = 5;
            const updatedTotalPages = Math.ceil(updatedNotes.length / notesPerPage);

            if (currentPage > updatedTotalPages) {
                setCurrentPage(updatedTotalPages);
            }
        } catch (error) {
            console.log('Error deleting note:', error);
        }
    };

    const handleCancelEdit = (noteId) => {
        setEditedNotes((prevEditedNotes) => {
            const updatedEditedNotes = { ...prevEditedNotes };
            delete updatedEditedNotes[noteId];
            return updatedEditedNotes;
        });
    };

    return (
        <div>
            {notes.length > 0 ? (
                <ul className="list-group">
                    {notes
                        // Slice the notes array to only show the notes for the current page (5 notes)
                        .slice((currentPage - 1) * 5, currentPage * 5)
                        .map((note) => (
                            <li key={note.id} className="list-group-item mb-3 border rounded p-4">
                                {editedNotes[note.id] ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedNotes[note.id]?.title !== undefined ? editedNotes[note.id]?.title : note.title}
                                            onChange={(e) =>
                                                setEditedNotes((prevEditedNotes) => ({
                                                    ...prevEditedNotes,
                                                    [note.id]: {
                                                        ...prevEditedNotes[note.id],
                                                        title: e.target.value,
                                                    },
                                                }))
                                            }
                                            className="form-control mb-2"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setEditedNotes((prevEditedNotes) => ({
                                                    ...prevEditedNotes,
                                                    [note.id]: {
                                                        ...prevEditedNotes[note.id],
                                                        image: e.target.files[0],
                                                    },
                                                }))
                                            }
                                            className="form-control mb-2"
                                        />
                                        <textarea
                                            value={editedNotes[note.id]?.text !== undefined ? editedNotes[note.id]?.text : note.text}
                                            onChange={(e) =>
                                                setEditedNotes((prevEditedNotes) => ({
                                                    ...prevEditedNotes,
                                                    [note.id]: {
                                                        ...prevEditedNotes[note.id],
                                                        text: e.target.value,
                                                    },
                                                }))
                                            }
                                            className="form-control mb-2"
                                        ></textarea>

                                        <button onClick={() => handleSaveNote(note.id)} className="btn btn-primary me-2">Save</button>
                                        <button onClick={() => handleCancelEdit(note.id)} className="btn btn-secondary">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <h3>{note.title}</h3>
                                        {note.imageName && (
                                            <img
                                                src={require(`../media/${note.imageName}`)}
                                                alt=""
                                                className="mb-2 note-image w-100"
                                            />
                                        )}
                                        <p style={{ whiteSpace: 'pre-line' }}>{note.text}</p>
                                        <button onClick={() => handleEditNote(note.id)} className="btn btn-primary me-2">Edit</button>
                                        <button onClick={() => handleDeleteNote(note.id)} className="btn btn-danger">Delete</button>
                                    </>
                                )}
                            </li>
                        ))}
                </ul>
            ) : (
                <p className="text-center">No notes found.</p>
            )}

            {totalPages > 1 && (
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <li
                                key={pageNumber}
                                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default NoteList;