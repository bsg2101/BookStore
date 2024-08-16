// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCart';

import "./css/ProductList.css";


const ProductList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBook, setEditingBook] = useState(null);
    const [error, setError] = useState(null); // Added for error handling

    // Fetch books from API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://localhost:7026/api/Book');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log('Fetched books:', data); // Log data to check structure
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to load books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);


    // Handle update book
    const handleUpdate = (book) => {
        setEditingBook({ ...book });
    };

    // Save updated book to API
    const handleSaveUpdate = async (e) => {
        e.preventDefault(); // Prevent form default behavior
        if (editingBook) {
            try {
                const response = await fetch('https://localhost:7026/api/Book', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingBook),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const updatedBook = await response.json();
                console.log('Updated book:', updatedBook);

                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === updatedBook.id ? updatedBook : book
                    )
                );

                setEditingBook(null);
            } catch (error) {
                console.error('Error updating book:', error);
                setError('Failed to update book'); // Set error message
            }
        }
    };

    // Handle delete book
    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const response = await fetch(`https://localhost:7026/api/Book/${bookId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Network response was not ok');

                // Remove book from local state
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
            } catch (error) {
                console.error('Error deleting book:', error);
                setError('Failed to delete book'); // Set error message
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>; // Display error message
    }

    return (
        <div className="product-list">
            <div className="product-list-grid">
                {books.map(book => (
                    <ProductCard
                        key={book.id}
                        book={book}
                        onUpdate={() => handleUpdate(book)}
                        onDelete={() => handleDelete(book.id)}
                    />
                ))}
            </div>

            {editingBook && (
                <div className="modal-overlay">
                    <div className="modal-contents">
                        <h2>Update Book</h2>
                        <form onSubmit={handleSaveUpdate}>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={editingBook.title}
                                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                                />
                            </label>
                            <label>
                                Author:
                                <input
                                    type="text"
                                    name="author"
                                    value={editingBook.author}
                                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                                />
                            </label>
                            {/* Add other form fields here */}
                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-update">Save</button>
                                <button type="button" className="btn btn-delete" onClick={() => setEditingBook(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

            )}

        </div>
    );
}

export default ProductList;



