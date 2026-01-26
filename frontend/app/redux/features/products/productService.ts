import axios from "axios";
const BASE_URL = "http://localhost:3001/products";

export const addProduct= async (productData:any)=>{
         try{
            const url = `${BASE_URL}/addproduct`
            const res= await axios.post(url, productData);
            return res.data;
        }catch (error) {
      console.error("Error in Adding Product:", error);
      throw error;
  }
}

export const getProducts = async (limit=10, page = 1, searchVal?: string,
  category?: string,
  subcategory?:string)=>{
  try {
    const url = `${BASE_URL}?limit=${limit}&page=${page}&title=${searchVal}&category=${category}&subcategory=${subcategory}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error in Fetching Data", error);
      throw error;
  }
}

export const banProduct = async (productId: number) => {
  const res = await axios.patch(`${BASE_URL}/ban/${productId}`);
  return res.data;
};

export const unbanProduct = async (productId: number) => {
  const res = await axios.patch(`${BASE_URL}/unban/${productId}`);
  return res.data;
};