"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "./register.css";
import { email, nanoid, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, provider, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/redux/store";
import { registerThunk } from "@/app/redux/features/users/userSlice";
import { FormHelperText } from "@mui/material";

const RegisterUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),

  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(/^\S*$/, "Password cannot contain spaces")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[!@#$%^&*]/, "Must contain at least one special character"),

  role: z.string("role is required"),
});

type RegisterFormInputs = z.infer<typeof RegisterUserSchema>;

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

 
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
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
        setTimeout(() => router.push("/welcome"), 1200);
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

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      if (data.role === '') {
        throw "Role should not be empty";
      }
      const response = await dispatch(registerThunk(data));
      if (response.type === 'auth/register/fulfilled') {
        setSnackbarMessage('User Registered Successfully!');
        setSnackbarOpen(true);
        setTimeout(() => router.push('/'), 2000);
      } else {
        setSnackbarMessage(response.payload);
        setSnackbarOpen(true);
      }
    }
    catch (err) {
      setSnackbarMessage(err);
      setSnackbarOpen(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });


   useEffect(()=>{
    console.log(errors)
  },[errors])


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField
              label="Email"
              variant="outlined"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password", { required: "Password is required" })}
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

            <FormControl fullWidth error>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Role"
                id="demo-simple-select"
                {...register("role")}
                error={!!errors.role}
                slotProps={
                  {

                  }
                }
              >
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
                <FormHelperText>With label + helper text</FormHelperText>
            </FormControl>
 

          <Button variant="contained" sx={{ mt: 1.5, mb: 2 }} type="submit">
            Register
          </Button>
        </Box>
      </form>
      <Button variant="contained" sx={{ mt: 2, borderRadius: "500px", width: 300, }} onClick={handleSignIn}>
        Sign in With Google
      </Button>

      <div
        className='login'><p>Already Registered <span className='login_link' onClick={() => { router.push('/') }}>Login</span></p>
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
