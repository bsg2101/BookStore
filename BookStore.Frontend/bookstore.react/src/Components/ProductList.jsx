import React, { useState, useEffect } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from "../Service/bookService";
import BookCard from './BookCard';
import './css/ProductList.css';

const ProductList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(''); // Form hataları için ekledik
    const [addingBook, setAddingBook] = useState(false);
    const [editingBook, setEditingBook] = useState(null); // Güncellenen kitap bilgisi
    const [deletingBook, setDeletingBook] = useState(null); // Silinecek kitap bilgisi
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        price: 0,
        publishedDate: '',
        imgUrl: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await getBooks();
                setBooks(books);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const validateForm = () => {
        if (!newBook.title || !newBook.author || !newBook.price || !newBook.publishedDate || !newBook.imgUrl) {
            setFormError('Lütfen tüm alanları doldurun.');
            return false;
        }
        setFormError('');
        return true;
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const addedBook = await addBook(newBook);
            setBooks([...books, addedBook]);
            setAddingBook(false);
            setNewBook({
                title: '',
                author: '',
                price: 0,
                publishedDate: '',
                imgUrl: ''
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdateBook = async (e) => {
        e.preventDefault();

        if (!editingBook.title || !editingBook.author || !editingBook.price || !editingBook.publishedDate || !editingBook.imgUrl) {
            setFormError('Lütfen tüm alanları doldurun.');
            return;
        }

        try {
            const updatedBook = await updateBook(editingBook.id, editingBook);
            setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
            setEditingBook(null); // Güncelleme başarılı olursa modalı kapat
            setFormError(''); // Hata mesajını temizle
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteBook = async () => {
        if (!deletingBook) return;

        try {
            await deleteBook(deletingBook.id);
            setBooks(books.filter((book) => book.id !== deletingBook.id));
            setDeletingBook(null); // Silme işlemi tamamlanınca modalı kapat
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-list">
            <div className="header">
                <button className="btn btn-add" onClick={() => setAddingBook(true)}>+ Kitap Ekle</button>
            </div>
            <div className="product-list-grid">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onUpdate={() => setEditingBook(book)}
                        onDelete={() => setDeletingBook(book)} // Silme işleminde modalı tetikleyin
                    />
                ))}
            </div>

            {addingBook && (
                <div className="modal-overlay">
                    <div className="modal-contents">
                        <h2>Yeni Kitap Ekle</h2>
                        {formError && <p className="form-error">{formError}</p>} {/* Form hatası gösterimi */}
                        <form onSubmit={handleAddBook}>
                            <label>
                                Başlık:
                                <input
                                    type="text"
                                    value={newBook.title}
                                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                />
                            </label>
                            <label>
                                Yazar:
                                <input
                                    type="text"
                                    value={newBook.author}
                                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                />
                            </label>
                            <label>
                                Fiyat:
                                <input
                                    type="number"
                                    value={newBook.price}
                                    onChange={(e) => setNewBook({ ...newBook, price: parseInt(e.target.value) })}
                                />
                            </label>
                            <label>
                                Yayın Tarihi:
                                <input
                                    type="date"
                                    value={newBook.publishedDate}
                                    onChange={(e) => setNewBook({ ...newBook, publishedDate: e.target.value })}
                                />
                            </label>
                            <label>
                                Resim URL:
                                <input
                                    type="text"
                                    value={newBook.imgUrl}
                                    onChange={(e) => setNewBook({ ...newBook, imgUrl: e.target.value })}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-update">Ekle</button>
                                <button type="button" className="btn btn-delete" onClick={() => setAddingBook(false)}>İptal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingBook && (
                <div className="modal-overlay">
                    <div className="modal-contents">
                        <h2>Kitabı Güncelle</h2>
                        {formError && <p className="form-error">{formError}</p>} {/* Form hatası gösterimi */}
                        <form onSubmit={handleUpdateBook}>
                            <label>
                                Başlık:
                                <input
                                    type="text"
                                    value={editingBook.title}
                                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                                />
                            </label>
                            <label>
                                Yazar:
                                <input
                                    type="text"
                                    value={editingBook.author}
                                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                                />
                            </label>
                            <label>
                                Fiyat:
                                <input
                                    type="number"
                                    value={editingBook.price}
                                    onChange={(e) => setEditingBook({ ...editingBook, price: parseInt(e.target.value) })}
                                />
                            </label>
                            <label>
                                Yayın Tarihi:
                                <input
                                    type="date"
                                    value={editingBook.publishedDate}
                                    onChange={(e) => setEditingBook({ ...editingBook, publishedDate: e.target.value })}
                                />
                            </label>
                            <label>
                                Resim URL:
                                <input
                                    type="text"
                                    value={editingBook.imgUrl}
                                    onChange={(e) => setEditingBook({ ...editingBook, imgUrl: e.target.value })}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-update">Güncelle</button>
                                <button type="button" className="btn btn-delete" onClick={() => setEditingBook(null)}>İptal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deletingBook && (
                <div className="modal-overlay">
                    <div className="modal-contents">
                        <h2>Silme Onayı</h2>
                        <p>"{deletingBook.title}" isimli kitabı silmek istediğinize emin misiniz?</p>
                        <div className="modal-buttons">
                            <button className="btn btn-update" onClick={handleDeleteBook}>Evet, Sil</button>
                            <button className="btn btn-delete" onClick={() => setDeletingBook(null)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;