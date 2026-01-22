import axios from "axios";
const BASE_URL = "http://localhost:3001/auth";

export const loginUser= async (loginData:any)=>{
         try{
            const res= await axios.post(BASE_URL, loginData);
            return res.data;
        }catch (error) {
      console.error("Error in Reigstering User:", error);
      throw error;
  }
}

export const registerUser= async (registerData : any)=>{
        try{
            const url="http://localhost:3001/auth/register"
            const res= await axios.post(url, registerData);
            return res.data;
        }catch (error) {
      console.error("Error in Reigstering User:", error);
      throw error;
    }
}