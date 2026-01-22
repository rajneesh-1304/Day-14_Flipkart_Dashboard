import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title, thumbnail, price, cartItems, setCartItems }) => {
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const exists = cartItems.find(item => item.id === id);
        if (exists) setAdded(true);
    }, [cartItems, id]);

    const handleClick = () => {
        navigate(`/product/${id}`)
    }

    const addItem = () => {
        if (!added) {
            setCartItems([...cartItems, { id, title, thumbnail, price, quantity: 1 }]);
            setAdded(true);
        }
    }

    return (
        <div className='card'>
            <div className='card_image'><img className='card_img' src={thumbnail} alt="" /></div>
            <div className='property'>{title}</div>
            <div>
                <button className='product_detail' onClick={handleClick}>Product Detail</button>
            </div>
            <div className='price'>
                <p className='amount'>$ {price}</p>
                <button className='cart_button' onClick={addItem}>
                    {added ? '✅ Added' : '🛒 Add'}
                </button>
            </div>
        </div>
    )
}

export default Card;
