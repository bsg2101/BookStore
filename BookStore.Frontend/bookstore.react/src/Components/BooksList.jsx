import React, { useEffect, useState } from 'react';
import { getBooks } from "../Service/bookService";
import "./css/BooksList.css";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Arama terimini state olarak tutuyoruz

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                setError('Kitaplar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Arama terimine göre kitapları filtreliyoruz
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="books-list-container">
            <h2>Tüm Kitaplar</h2>
            <input
                type="text"
                placeholder="Kitap ismi veya yazara göre ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="books-list-grid">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="book-card">
                        <img src={book.imgUrl} alt={book.title} />
                        <div className="book-details">
                            <h5>{book.title}</h5>
                            <p>Yazar: {book.author}</p>
                            <p>Fiyat: {book.price} ₺</p>
                            <p>Yayın Tarihi: {new Date(book.publishedDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;