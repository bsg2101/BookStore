import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import ProductList from './Components/ProductList';
import BooksList from './Components/BooksList'; // Yeni kitap listeleme bileşeni
import Footer from "./Components/Footer";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container mt-5'>
        <Routes>
          <Route path="/" element={<ProductList />} /> {/* Anasayfa */}
          <Route path="/shop" element={<BooksList />} /> {/* Kitaplar sayfası */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
