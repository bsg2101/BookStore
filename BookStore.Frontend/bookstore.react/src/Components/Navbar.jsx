import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
    // Menü durumunu yönetmek için useState kullanıyoruz
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Menü durumunu tersine çevirir
    };

    const handleNavLinkClick = () => {
        // Menüden bir linke tıkladığınızda menüyü kapatın
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <h1 className="text-white display-6">BookStore</h1>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleToggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end onClick={handleNavLinkClick}>
                                Anasayfa
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop" onClick={handleNavLinkClick}>
                                Kitaplar
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop-detail" onClick={handleNavLinkClick}>
                                Sipariş
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" onClick={handleNavLinkClick}>
                                İletişim
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <NavLink to="#" className="btn btn-outline-light">
                            <i className="fas fa-user fa-lg"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
