"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/hooks";
import { fetchProductsThunk } from "@/app/redux/features/products/productSlice";
import { addToCartThunk, addToWishlistThunk } from "@/app/redux/features/cart/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./product.css";

const LIMIT = 10;

export default function Product() {
  const dispatch = useDispatch();

  const userId = useAppSelector((state) => state.users.currentUser?.id);
  const products = useAppSelector((state) => state.products.productData);
  const total = useAppSelector((state) => state.products.total);
  const { searchValue, category, subcategory } = useAppSelector(
    (state) => state.search,
  );

  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbar({ message, type });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / LIMIT);

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
  const [debouncedCategory, setDebouncedCategory] = useState(category);
  const [debouncedSubcategory, setDebouncedSubcategory] = useState(subcategory);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setDebouncedCategory(category);
      setDebouncedSubcategory(subcategory);
      setPage(1);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchValue, category, subcategory]);

  useEffect(() => {
    dispatch(
      fetchProductsThunk({
        page,
        limit: LIMIT,
        searchValue: debouncedSearch,
        category: debouncedCategory,
        subcategory: debouncedSubcategory,
      }),
    );
  }, [
    dispatch,
    page,
    debouncedSearch,
    debouncedCategory,
    debouncedSubcategory,
  ]);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleItems = 4;
  const prevSlide = () => setCarouselIndex((prev) => Math.max(prev - 1, 0));
  const nextSlide = () =>
    setCarouselIndex((prev) =>
      Math.min(prev + 1, products.length - visibleItems),
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        prev < products.length - visibleItems ? prev + 1 : 0,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="home">
      <div className="relative w-full mb-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 gap-4"
            style={{
              transform: `translateX(-${(100 / visibleItems) * carouselIndex}%)`,
            }}
          >
            {products.map((p, idx) => (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="carousel-card">
                  <img
                    src={
                      Array.isArray(p.images) && p.images.length > 0
                        ? p.images[0]
                        : "/no-image.png"
                    }
                    alt={p.title}
                    className="carousel-img"
                  />
                  <h3 className="carousel-title">{p.title}</h3>
                  <p className="carousel-price">₹ {p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={prevSlide} className="carousel-btn left">
          &#10094;
        </button>
        <button onClick={nextSlide} className="carousel-btn right">
          &#10095;
        </button>
      </div>

      <div className="prod">
        {products.length > 0 ? (
          products.map((p, idx) => (
            <div className="card" key={idx}>
              <div className="card_image">
                <img className="card_img" src={p.images} alt={p.title} />
              </div>
              <div className="card_body">
                <h3 className="property">{p.title}</h3>
                <p className="category">{p.category}</p>
                <div className="price">
                  <span className="amount">₹ {p.price}</span>
                  <span className="rating">⭐ {p.rating || 0}</span>
                </div>
                <div style={{ display: "flex", gap: "3px" }}>
                  <button
                    className="add_to_cart_btn"
                    onClick={async () => {
                      if (!userId) {
                        showSnackbar("Please login first", "error");
                        return;
                      }
                      try {
                        await dispatch(
                          addToCartThunk({
                            userId,
                            productId: p.id,
                            quantity: 1,
                            sellerId: p.sellerId,
                          }),
                        ).unwrap();
                        showSnackbar("Added to cart ✅", "success");
                      } catch (error) {
                        showSnackbar("Failed to add to cart ❌", "error");
                        console.error(error);
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="add_to_cart_btn"
                    onClick={async () => {
                      if (!userId) {
                        showSnackbar("Please login first", "error");
                        return;
                      }
                      try {
                        await dispatch(addToWishlistThunk({userId, productId: p.id}),)
                        showSnackbar("Added to wishlist ✅", "success")
                      } catch (error) {
                        showSnackbar("Failed to add to wishlist ❌", "error");
                        console.error(error,'fasdfa');
                      }
                    }}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* MUI Snackbar */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar?.type || "success"}
          sx={{ width: "100%" }}
        >
          {snackbar?.message || ""}
        </Alert>
      </Snackbar>
    </div>
  );
}
