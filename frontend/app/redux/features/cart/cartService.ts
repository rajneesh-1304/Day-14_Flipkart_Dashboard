import axios from "axios";

const BASE_URL = "http://localhost:3001/cart";

export const getCart = async (userId: number) => {
  try {
    const url = `${BASE_URL}?userId=${userId}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error in Fetching Cart:", error);
    throw error;
  }
};

export const addToCart = async (cartData: {
  userId: number;
  productId: number;
  quantity: number;
  sellerId: number;
}) => {
  try {
    const url = `${BASE_URL}/add`;
    const res = await axios.post(url, cartData);
    return res.data;
  } catch (error) {
    console.error("Error in Adding to Cart:", error);
    throw error;
  }
};

export const addToWishlist = async (wishlistData: {
  userId: number;
  productId: number;
})=>{
  try {
    const url = `http://localhost:3001/wishlist`;
    const res = await axios.post(url, wishlistData);
    return res.data;
  } catch (error) {
    console.error("Error in Adding to Wishlist:", error);
    throw error;
  }
}

export const getWishlist = async (userId:number)=>{
  try {
    const url = `http://localhost:3001/wishlist/${userId}`;
    const res = await axios.get(url);
    console.log(res, 'fasdf')
    return res.data;
  } catch (error) {
    console.error("Error in fetching Wishlist:", error);
    throw error;
  }
}

export const updateCartItem = async (
  itemId: number,
  quantity: number
) => {
  try {
    const url = `${BASE_URL}/update/${itemId}`;
    const res = await axios.patch(url, { quantity });
    return res.data;
  } catch (error) {
    console.error("Error in Updating Cart Item:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId: number) => {
  try {
    const url = `${BASE_URL}/remove/${itemId}`;
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    console.error("Error in Removing Cart Item:", error);
    throw error;
  }
};

export const clearCart = async (userId: number) => {
  try {
    const url = `${BASE_URL}/clear?userId=${userId}`;
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    console.error("Error in Clearing Cart:", error);
    throw error;
  }
};
