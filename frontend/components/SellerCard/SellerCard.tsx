"use client";
import "./sellercard.css";
import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  id: number | string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  quantity: number;
  rating: number;
  images: string[];
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  price,
  category,
  subcategory,
  quantity,
  rating,
  images,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="card">
      <div className="card_image">
        <img className="card_img" src={images[0]} alt="Loading..." />
      </div>

      <h3 className="property">{title}</h3>

      <p className="description">{description}</p>

      <div className="meta">
        <span className="badge">{category}</span>
        <span className="badge secondary">{subcategory}</span>
      </div>

      <div className="price">
        <p className="amount">${price}</p>
        <p className="rating">{rating}</p>
      </div>

      <p className={`stock ${quantity > 0 ? "in" : "out"}`}>
        {quantity > 0 ? `In Stock (${quantity})` : "Out of Stock"}
      </p>

      <button className="product_detail" onClick={handleClick}>
        View Details
      </button>
    </div>
  );
};

export default Card;
