// src/components/ProductCard.js
import React from 'react';
import "./css/ProductCard.css";

const ProductCard = ({ book }) => {
    return (
        <div className="col-md-4">
            <div className="card product-card shadow-sm mb-4">
                <img src={book.imgUrl} className="card-img-top" alt={book.title} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">Author: {book.author}</p>
                    <p className="card-text text-muted">Price: ${book.price}</p>
                    <p className="card-text text-muted">Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => alert(`${book.title} added to cart!`)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
