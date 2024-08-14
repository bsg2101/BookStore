// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCart';

const ProductList = () => {
    const [books, setBooks] = useState([]); // Kitaplar için state oluştur
    const [loading, setLoading] = useState(true); // Yüklenme durumu için state

    useEffect(() => {
        // API çağrısını gerçekleştirme
        fetch('https://localhost:7026/api/Book')  // Buraya API URL'nizi koyun
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data); // API'den gelen verileri state'e ata
                setLoading(false); // Yüklenme durumunu false yap
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false); // Hata durumunda da yüklenme durumunu false yap
            });
    }, []); // Boş array ile useEffect, bileşen yüklendiğinde yalnızca bir kez çalışır

    if (loading) {
        return <p>Loading...</p>; // Yüklenme durumunda kullanıcıya gösterilecek mesaj
    }

    return (
        <div className="container my-5">
            <div className="row">
                {books.map(book => (
                    <ProductCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;