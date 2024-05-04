import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../components/Pagination';

export default function AdminDashboard({ data, setData }) {
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ Id: '', Name: '', Author: '', Category: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const navigate = useNavigate();

    const handleCreate = () => {
        setData(prevData => [
            ...prevData,
            { Id: newId, Name: newName, Author: newAuthor, Category: newCategory }
        ]);
        setNewId('');
        setNewName('');
        setNewAuthor('');
        setNewCategory('');
    };

    const handleDelete = (id) => {
        setData(prevData => prevData.filter(item => item.Id !== id));
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleUpdate = (id) => {
        setData(prevData => prevData.map(item => item.Id === id ? { ...item, ...editFormData } : item));
        setEditingId(null);
        setEditFormData({ Id: '', Name: '', Author: '', Category: '' });
    };

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCPage(number) {
        setCurrentPage(number);
    }

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-3 text-end'>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h2>Book Details</h2>
                        <div className='mb-3'>
                            <input type="text" className='form-control mb-2' placeholder="ID" value={newId} onChange={e => setNewId(e.target.value)} />
                            <input type="text" className='form-control mb-2' placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
                            <input type="text" className='form-control mb-2' placeholder="Author" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
                            <input type="text" className='form-control mb-2' placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                            <button className='btn btn-success mt-2' onClick={handleCreate}>Create+</button>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((item) => (
                                    <tr key={item.Id}>
                                        {editingId === item.Id ? (
                                            <>
                                                <td><input type="text" className='form-control' value={editFormData.Id} name="Id" onChange={handleEditFormChange} /></td>
                                                <td><input type="text" className='form-control' value={editFormData.Name} name="Name" onChange={handleEditFormChange} /></td>
                                                <td><input type="text" className='form-control' value={editFormData.Author} name="Author" onChange={handleEditFormChange} /></td>
                                                <td><input type="text" className='form-control' value={editFormData.Category} name="Category" onChange={handleEditFormChange} /></td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() => handleUpdate(item.Id)}>Save</button>
                                                    <button className='btn btn-secondary ms-2' onClick={() => setEditingId(null)}>Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{item.Id}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.Author}</td>
                                                <td>{item.Category}</td>
                                                <td>
                                                    <button className='btn btn-warning me-2' onClick={() => {
                                                        setEditingId(item.Id);
                                                        setEditFormData({ Id: item.Id, Name: item.Name, Author: item.Author, Category: item.Category });
                                                    }}>Update</button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(item.Id)}>Delete</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            npage={npage}
                            prePage={prePage}
                            nextPage={nextPage}
                            changeCPage={changeCPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
