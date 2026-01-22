import axios from "axios";

const BASE_URL = "http://localhost:3001/products";

// export const getProduct = async () => {
//   const res = await axios.get(BASE_URL);
//   return res.data;
// };

// export const createTodo = async (title: string) => {
//   const res = await axios.post(BASE_URL, { title });
//   return res.data;
// };

export const getProductById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const getProductByTitle = async (title: string) => {
  const res = await axios.get(`${BASE_URL}/${title}`);
  return res.data;
};

export const getProductByPagination = async (skip: any, limit: any) => {
  const res = await axios.get(`${BASE_URL}?skip=${skip}&limit=${limit}`);
  return res.data;
};

export const fetchProducts = async ( title : any, page: any, limit: any,) => {
  try {
    const skip = (page - 1) * limit;
    let url = await axios.get(`${BASE_URL}?title=${title}&limit=${limit}&skip=${skip}`)
    return url.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
