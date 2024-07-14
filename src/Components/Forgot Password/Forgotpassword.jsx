import React, { useState } from "react";
import { Button, TextField, Grid, Paper, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Email } from "@mui/icons-material";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resetError, setResetError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("email =====>", data.email);

    // Store the email in local storage
    localStorage.setItem("forgotPasswordEmail", data.email);

    try {
      const response = await axios.post(
        "https://desismart.co.uk/web/user/check-email",
        {
          email: data.email,
        }
      );
      console.log("data =======>", response);
      if (response.status === 200) {
        navigate("/createpassword", { state: { email: data.email } });
      } else {
        setResetError("Email not found.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setResetError("Failed to check email.");
    }
  };

  return (
    <div className="lg:m-32 3xs:p-10 items-center">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 8 }}>
        <h1 className="text-center font-bold text-3xl mb-2 mt-10">
          Forgot Password
        </h1>
        <p className="text-center text-xl mb-3">
          Reset Your Password Anytime....
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
              />
            </Grid>
          </Grid>
          {resetError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {resetError}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#2E7D32",
              "&:hover": { bgcolor: "#1B5E20" },
            }}
          >
            Check Email
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#2e7d32] text-white p-3 rounded-xl mt-5 mb-5"
            >
              Back to Login
            </button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ForgotPassword;
