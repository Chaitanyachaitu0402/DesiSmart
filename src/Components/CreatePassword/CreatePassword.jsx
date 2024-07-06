import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateNewPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [resetError, setResetError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const email = localStorage.getItem("forgotPasswordEmail");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/user/forgot-password', {
                email: email,
                newpassword: data.password,
                confirmpassword: data.confirmPassword
            });
console.log(response);
            if (response.status === 200) {
                setSuccessMessage('Password reset successfully.');
                setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
            } else {
                setResetError(response.data.error || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Reset Password Error:', error);
            setResetError('Failed to reset password.');
        }
    };

    return (
        <div className='lg:m-32 3xs:p-10 items-center'>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 8 }}>
                <h1 className='text-center font-bold text-3xl mb-2 mt-10'>Create New Password</h1>
                <p className='text-center text-xl mb-3'>Enter Your New Password</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    },
                                })}
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                id="password"
                                label="New Password"
                                name="password"
                                autoComplete="new-password"
                                error={errors.password ? true : false}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: value =>
                                        value === watch('password') || 'Passwords do not match',
                                })}
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                id="confirmPassword"
                                label="Confirm New Password"
                                name="confirmPassword"
                                autoComplete="new-password"
                                error={errors.confirmPassword ? true : false}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                            />
                        </Grid>
                    </Grid>
                    {resetError && <Alert severity="error" sx={{ mt: 2 }}>{resetError}</Alert>}
                    {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
                    >
                        Reset Password
                    </Button>
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <button onClick={() => navigate('/login')} className='bg-[#2e7d32] text-white p-3 rounded-xl mt-5 mb-5'>
                            Back to Login
                        </button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default CreateNewPassword;
