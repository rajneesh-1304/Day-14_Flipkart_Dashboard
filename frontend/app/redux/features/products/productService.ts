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

export const getProducts = async (limit=10, skip=0, searchVal='', searchProd='')=>{
  try {
    const res = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}&title=${searchVal}&category=${searchProd}`);
    return res.data;
  } catch (error) {
    console.error("Error in Fetching Data", error);
      throw error;
  }
}