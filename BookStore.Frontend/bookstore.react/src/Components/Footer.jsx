// src/components/Footer.js
import React from 'react';
import "./css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="mb-3 text-white">BookStore</h5>
                        <p className="small text-muted">
                            BookStore, en kaliteli kitapları bulabileceğiniz bir platformdur. Bizimle keyifli okumalar!
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5 className="mb-3 text-white">Hızlı Bağlantılar</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-muted">Anasayfa</a></li>
                            <li><a href="/shop" className="text-muted">Kitaplar</a></li>
                            <li><a href="/about" className="text-muted">Hakkımızda</a></li>
                            <li><a href="/contact" className="text-muted">İletişim</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="mb-3 text-white">İletişim Bilgileri</h5>
                        <p className="small text-muted">
                            Adres: 1234 Kitap Caddesi, İstanbul, Türkiye
                        </p>
                        <p className="small text-muted">
                            Telefon: +90 123 456 7890
                        </p>
                        <p className="small text-muted">
                            E-posta: info@bookstore.com
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="mb-3 text-white">Bizi Takip Edin</h5>
                        <div className="d-flex">
                            <a href="#" className="text-light me-3"><i className="fab fa-facebook fa-lg"></i></a>
                            <a href="#" className="text-light me-3"><i className="fab fa-twitter fa-lg"></i></a>
                            <a href="#" className="text-light me-3"><i className="fab fa-instagram fa-lg"></i></a>
                            <a href="#" className="text-light"><i className="fab fa-linkedin fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="small text-muted mb-0">&copy; 2024 BookStore. Tüm Hakları Saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
