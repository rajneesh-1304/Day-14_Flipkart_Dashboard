'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './detail.css';
import { fetchProductByIdThunk } from '@/app/redux/features/seller/sellerSlice';
import { useParams } from 'next/navigation';

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct]=useState([]);

 useEffect(() => {
  const fetchProduct = async () => {
    if (productId) {
      const response = await dispatch(fetchProductByIdThunk(productId));
      setProduct(response.payload); 
    }
  };

  fetchProduct();
}, [dispatch, productId]);


  return (
    <div className="product-page">
      <div className="product-card">
        <div className="product-grid">

          <div className="product-images">
            {product && product?.images?.length > 0 && (
  <img src={product?.images[0]} alt={product.title} className="main-image" />
)}

            {/* <div className="thumbnail-row">
              {product?.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  className="thumbnail"
                />
              ))}
            </div> */}
          </div>

          <div className="product-details">
            <h1 className="product-title">{product?.title}</h1>

            <p className="product-description">{product?.description}</p>

            <p className="product-price">₹{product?.price}</p>

            <div className="product-meta">
              <span>⭐ {product?.rating}</span>
              <span>Stock: {product?.quantity}</span>
            </div>

            <div className="product-info">
              <p><strong>Category:</strong> {product?.category}</p>
              <p><strong>Subcategory:</strong> {product?.subcategory}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
