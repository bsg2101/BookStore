import React from 'react';
import "./css/BookCard.css";

const BookCard = ({ book, onUpdate, onDelete }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="product-card shadow-sm mb-4">
            <img src={book.imgUrl} alt={book.title} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted">Yazar: {book.author}</p>
                <p className="card-text text-muted">Fiyat: {book.price} ₺</p>
                <p className="card-text text-muted">Yayın Tarihi: {formatDate(book.publishedDate)}</p>
                <div className="button-group">
                    <button
                        className="card-btn card-btn-update"
                        onClick={onUpdate}
                    >
                        Güncelle
                    </button>
                    <button
                        className="card-btn card-btn-delete"
                        onClick={onDelete}
                    >
                        Sil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
