'use client';

import { useEffect, useState } from 'react';
// import { getProduct, getProductById, getProductByTitle, getProductByPagination, fetchProducts } from '@/app/lib/api';
import { useRouter } from 'next/router';
import { addProduct } from '@/app/redux/features/products/productService';
import {  getProductThunk } from '@/app/redux/features/products/productSlice';
import './product.css'
import { useDispatch } from 'react-redux';
export default function Product({searchValue, searchProduct}) {
  const [product, setProduct] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const dispatch=useDispatch();
//   const router =useRouter();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
//   const loadProducts = async ()=>{
//     const data = await getProduct();
//     setProduct(data);
//   }
// //   const handleClick=(id:any)=>{
// //         router.push(`/product/${id}`)
// //     }
  const fetchProd = async (currentPage, itemsPerPage, searchVal, searchProd) => {
    try {
      const response = await dispatch(getProductThunk({currentPage, itemsPerPage, searchVal, searchProd}));
      console.log('response: ', response.payload);
      setProduct(response.payload);
    //   setTotalProducts(response.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

//   useEffect(() => {
//     loadProducts();
//   }, []);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleItems = 4; // how many items visible in carousel at a time

  const prevSlide = () => setCarouselIndex((prev) => Math.max(prev - 1, 0));
  const nextSlide = () =>
    setCarouselIndex((prev) => Math.min(prev + 1, product.length - visibleItems));

useEffect(()=>{
    fetchProd(currentPage, itemsPerPage, searchValue, searchProduct);
  }, [currentPage, searchProduct, searchValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        prev < product.length - visibleItems ? prev + 1 : 0
      );
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [product]);

//   useEffect(()=>{
//     fetchProd(currentPage);
//   }, [searchValue, currentPage]);
  return (
    <>
      <div className="home">
        <div className="relative w-full mb-6">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${(100 / visibleItems) * carouselIndex}%)`,
              }}
            >
              {product.map((p, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 p-2"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <div className="bg-white rounded shadow p-2">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="mt-2 font-semibold">{p.title}</h3>
                    <p>${p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prevSlide}
            className="button absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="button absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </div>
        <div className='prod'>
        {product?.map((p, idx) => (
          <div className='card' key={idx}>
            <div className='card_image'><img className='card_img' src={p.image} alt="" /></div>
            <div className='property'>{p.title}</div>
            <div>
                {/* <button className='product_detail' onClick={()=>handleClick(p.id)}>Product Detail</button> */}
            </div>
            <div className='price'>
                <p className='amount'>$ {p.price}</p>
                <p>{p.category}</p>
                {/* <button className='cart_button' onClick={addItem}>
                    {added ? '✅ Added' : '🛒 Add'}
                </button> */}
            </div>
        </div>
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
      </div>
    </>
  );
}
