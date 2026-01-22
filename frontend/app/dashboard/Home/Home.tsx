import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';

const Home = ({ searchValue, cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  const fetchProducts = async (page = 1, query = '') => {
    try {
      const skip = (page - 1) * itemsPerPage;
      let url = query
        ? `https://dummyjson.com/products/search?q=${query}&limit=${itemsPerPage}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

      const response = await axios.get(url);
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchValue);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1, searchValue);
    }, 2000);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  useEffect(() => {
    fetchProducts(currentPage, searchValue);
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <>
      <div className="home">
        {products.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            thumbnail={card.thumbnail}
            title={card.title}
            price={card.price}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span> Page {currentPage} of {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
