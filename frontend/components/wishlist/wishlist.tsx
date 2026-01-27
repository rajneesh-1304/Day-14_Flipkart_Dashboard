"use client";

import { useAppDispatch } from "react-redux";
import { useEffect } from "react";
import { getWishlist } from "@/app/redux/features/cart/cartService";

const page = () => {
  const dispatch = useAppDispatch();
  //   const userId = useAppSelector((state) => state.users.currentUser?.id);
  //   const wishlist = useAppSelector((state) => state.cart.wishlist);

  useEffect(() => {
    const fetchWish = () => {
      const data = dispatch(getWishlist(1));
      console.log("fgsdfgsdf", data);
    };
    fetchWish();
  }, []);
  return <div></div>;
};

export default page;
