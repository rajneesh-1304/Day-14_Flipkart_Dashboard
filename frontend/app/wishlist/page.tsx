"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/hooks";
import { useEffect } from "react";
import { getWishlist } from "../redux/features/cart/cartService";
import { useAppDispatch } from "../lib/hooks";
import { fetchWishlistThunk } from "../redux/features/cart/cartSlice";

const page = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.users.currentUser?.id);
  const wishlist = useAppSelector((state) => state.cart.wishlist);

  const id = Number(userId);
  useEffect(() => {
    const fetchWish = async () => {
      const data = await dispatch(fetchWishlistThunk(id));
    };
    fetchWish();
  }, []);
  console.log(wishlist);
  return (
    <div style={{ marginTop: "70px" }}>
      {wishlist?.map((wish) => (
        <div className="admin-info">
          <strong>{wish.title}</strong>
          <p>{wish.category}</p>
          <p>{wish.subcategory}</p>
          <p>₹{wish.price}</p>
          <p className="admin-sub">
            Seller: <b>{wish.sellerId}</b>
          </p>
          <img src={wish.images[0]} alt="" />
        </div>
      ))}
    </div>
  );
};

export default page;
