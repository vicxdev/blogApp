import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import NoteAddForm from './NoteAddForm';
import NoteList from './NoteList';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [notes, setNotes] = useState([]);
    const [editedNotes, setEditedNotes] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = 'Blog';
    }, [setAuthenticated]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/notes`);
            const sortedNotes = response.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setNotes(sortedNotes);
            setEditedNotes({});

            const notesPerPage = 5;
            const totalNotes = sortedNotes.length;
            const totalPages = Math.ceil(totalNotes / notesPerPage);
            setTotalPages(totalPages);
        } catch (error) {
            console.log('Error fetching notes:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('sessionToken');
        setAuthenticated(false);
    };

    const handleAddNote = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <LoginForm setAuthenticated={setAuthenticated} apiUrl={apiUrl} />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <nav className="navbar navbar-dark bg-dark">
                        <div className="container-md d-flex">
                            <button onClick={handleAddNote} className="btn btn-primary me-2">
                                Add Note
                            </button>
                            <div>
                                <button onClick={handleLogout} className="btn btn-sm btn-danger me-2 mb-1">Logout</button>
                                <a className="navbar-brand" href="/">Blog</a>
                            </div>
                        </div>
                    </nav>
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <NoteList 
                                    apiUrl={apiUrl}
                                    notes={notes}
                                    setNotes={setNotes}
                                    editedNotes={editedNotes}
                                    setEditedNotes={setEditedNotes}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    fetchNotes={fetchNotes}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Note</h5>
                                <button type="button" className="close btn btn-sm btn-danger" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <NoteAddForm 
                                    apiUrl={apiUrl}
                                    onCloseModal={handleCloseModal}
                                    notes={notes}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;