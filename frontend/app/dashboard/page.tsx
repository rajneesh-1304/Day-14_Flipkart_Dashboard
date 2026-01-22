"use client";

import { useState } from "react";
import Product from "./Product/Product";
import Navbar from "./Navbar/Navbar";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  return (
    <div>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
      <Product searchValue={searchValue} searchProduct={searchProduct}/>
    </div>
  );
}
