"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import "./login.css";
import { auth, db, provider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { loginThunk, registerThunk } from "@/app/redux/features/users/userSlice";

const LoginUserSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, { message: "Password is required" }),
});

type LoginFormInputs = z.infer<typeof LoginUserSchema>;

interface UserState {
  users: LoginFormInputs[];
  isAuthenticated: boolean;
}

interface RootState {
  users: UserState;
}

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email) {
        throw "Google account has no email";
      }

      const userData = {
        name: user.email.split("@")[0],
        email: user.email,
        password: "Google@123",
        role: "customer",
      };

      const response = await dispatch(registerThunk(userData));

      if (response.type === "auth/register/fulfilled") {
        setSnackbarMessage("User Registered successfully!");
        setSnackbarOpen(true);
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setSnackbarMessage("Registration failed");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Google sign-in failed");
      setSnackbarOpen(true);
    }
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await dispatch(loginThunk(data));
      console.log(response)
      if (response.type === 'auth/rejected') {
        setSnackbarMessage(response.payload);
        setSnackbarOpen(true);
      } else {

        if (response.payload.role === 'customer') {
          setSnackbarMessage("Login successful!");
          setSnackbarOpen(true);
          setTimeout(() => router.push("/dashboard"), 1200);
        } else if (response.payload.role === 'seller') {
          setSnackbarMessage("Login successful!");
          setSnackbarOpen(true);
          setTimeout(() => router.push("/seller"), 1200);
        } else {
          setSnackbarMessage("Login successful!");
          setSnackbarOpen(true);
          setTimeout(() => router.push("/admin"), 1200);
        }
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("User not registered");
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", width: 300, gap: 2, mt: 4 }}>
          <FormControl variant="standard">
            <TextField
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button variant="contained" sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </Box>
      </form>

      <Button
        variant="contained"
        sx={{ mt: 8, width: 300, borderRadius: "500px" }}
        onClick={handleSignIn}
      >
        Sign in With Google
      </Button>
      <div className="register">
        <p>
          Not Registered{" "}
          <span className="register_link" onClick={() => router.push("/register")}>
            Register
          </span>
        </p>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </div>
  );
}
