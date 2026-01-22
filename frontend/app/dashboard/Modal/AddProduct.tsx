"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
// import { addProductThunk, fetchProductsThunk } from "@/app/redux/features/product/productSlice";
import { AppDispatch } from "@/app/redux/store";
import "./addproduct.css";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { addProductThunk } from "@/app/redux/features/products/productSlice";

type AddProductModalProps = {
  onClose: () => void;
};

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z
    .string()
    .min(1, { message: "Price is required" }),
  category: z.string().min(2, "Category must be at least 2 characters"),
  image: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProductModal({ onClose }: AddProductModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    console.log("Adding product:", data);
    const productData = {
        title:data.title,
        price:data.price,
        category:data.category,
        image:data.image,
        description:data.description,
        rating:0,
    }

    dispatch(addProductThunk(productData));

    reset();
    onClose();
  };

  return (
    <div className="modal_overlay">
      <div className="modal">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="modal_form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 300,
              gap: 1.5,
            }}
          >
            <FormControl variant="standard">
              <TextField
                label="Title"
                variant="outlined"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Description"
                variant="outlined"
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Price"
                variant="outlined"
                inputProps={{
                min: 0,
                id: "distance-input",
                style: { textAlign: "center" },
              }}
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Image"
                variant="outlined"
                {...register("image", { required: "Price is required" })}
                error={!!errors.image}
                helperText={errors.image ? errors.image.message : ""}
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                label="Category"
                variant="outlined"
                {...register("category", { required: "Price is required" })}
                error={!!errors.category}
                helperText={errors.category ? errors.category.message : ""}
              />
            </FormControl>

            <div className="modal_actions">
              <Button
                variant="contained"
                sx={{ mt: 2, width: 200 }}
                type="submit"
              >
                Add
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 2, width: 200 }}
                onClick={()=>onClose()}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
}
