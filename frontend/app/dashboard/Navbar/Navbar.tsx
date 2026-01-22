'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/hooks';
import AddProductModal from '../Modal/AddProduct';


const Navbar = ({ searchValue, setSearchValue, searchProduct, setSearchProduct }) => {

const currentUser = useAppSelector(
      (state) => state.users.currentUser
    );
const router=useRouter();
const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='navbar'>
        <h1 className='heading' onClick={()=>router.push('/')}>Flipkart</h1>
      <input
        className='search_bar'
        placeholder='Search...'
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <select style={{padding:"5px",  borderRadius:"10px"}} name="Cuisine" id="" onChange={(e)=>setSearchProduct(e.target.value)} value={searchProduct}>
          <option value="">Clothes</option>
          <option value="Italian">Electronics</option>
          <option value="Asian">Books</option>
          <option value="Pakistani">Grocery</option>
        </select>
      {currentUser.role==='seller'?<button className='cart_button' onClick={()=>setIsModalOpen(true)}>Add Product</button> : <></>}

      {isModalOpen && (
        <AddProductModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Navbar;
