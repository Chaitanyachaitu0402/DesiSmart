import React, { useState, useEffect, useContext } from 'react';
import { Button, Fade, TextField, Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, MenuItem, Select } from '@mui/material';
import { useForm } from "react-hook-form";
import { groceryContext } from '../../Layout/Layout';
import { handleSessionStorage } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoBackButton from '../GoBackButton/GoBackButton';

const DeliveryForm = () => {
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;
    const [openDialog, setOpenDialog] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cardDetails, setCardDetails] = useState({ number: '', expiryMonth: '', expiryYear: '', cvv: '' });
    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupLocations] = useState([
        { id: '1', name: 'Monday–Friday 8:00–20:00, Saturday: 9:00–20:00, Sunday: 9:00–17:00' },
        { id: '2', name: 'Monday–Friday 8:00–20:00, Saturday: 9:00–20:00, Sunday: 9:00–17:00' },
        { id: '3', name: 'Monday–Friday 8:00–20:00, Saturday: 9:00–20:00, Sunday: 9:00–17:00' }
    ]);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { full_name, email, address } = watch();

    const navigate = useNavigate();

    useEffect(() => {
        calculateTotalAmount();
    }, [cartItems]);

    const calculateTotalAmount = () => {
        let total = 0;
        const deliveryCharge = 5.99;

        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

        total += deliveryCharge;
        setTotalAmount(total);
    };

    // Function to add order to the database
    const addOrderToDatabase = async (order) => {
        const accessToken = localStorage.getItem('accessToken');
        const user_id = localStorage.getItem('user_id'); // Adjust this if the user ID is stored elsewhere

        try {
            const response = await axios.post('http://localhost:3000/order/create-order', {
                ...order,
                user_id: user_id, // Add user_id to the order object
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Failed to add order to the database:", error.response ? error.response.data : error.message);
            throw error; // Rethrow the error so it can be handled by the caller
        }
    };

    const onSubmit = async (data) => {
        setOpenDialog(true);
    };

    const handlePayment = async () => {
        const paymentData = {
            amount: totalAmount,
            currency: 'GBP',
            cardDetails: {
                number: cardDetails.number,
                expiryMonth: cardDetails.expiryMonth,
                expiryYear: cardDetails.expiryYear,
                cvv: cardDetails.cvv
            }
        };

        try {
            const response = await axios.post('http://localhost:8080/https://gw1.tponlinepayments.com/admin/login.php', paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Signature-Key': '419plU92BEY02g9D97X4',
                    'Merchant-ID': '268397',
                    'Country-Code': '827',
                    'Currency-Code': '827'
                }
            });
console.log("Payment response",response)
            if (response.data.success) {
                handleCardPaymentSuccess();
            } else {
                console.error('Payment Error:', response.data.error);
            }
        } catch (error) {
            console.error('Payment Error:', error);
        }
    };

    const handleCardPaymentSuccess = async () => {
        const orderData = {
            user_id: localStorage.getItem('user_id'), // Use actual user_id
            user_name: full_name,
            cart_details: cartItems,
            total_cost: totalAmount,
            mode_of_payment: paymentMethod,
            delivery_date: pickupLocation,
            time: new Date()
        };

        try {
            const response = await addOrderToDatabase(orderData);

            if (response.success) {
                alert('Thank you! Your order has been placed.');
                handleSessionStorage('remove', 'cartItems');
                setCartItems([]);
                setOpenDialog(false);
                navigate('/');
            } else {
                console.error('Error storing order:', response.error);
            }
        } catch (error) {
            console.error('Error storing order:', error);
        }
    };

    const handleOK = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Dialog open={openDialog} onClose={handleOK}>
                <DialogTitle className='complete text-3xl font-bold' style={{ fontSize: '24px', fontWeight: 'bold' }}>Complete Your Payment</DialogTitle>
                <DialogContent>
                    <p className='font-bold text-2xl mb-4'>Total Amount: <span className='font-extrabold'>{totalAmount}</span></p>
                    <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
                        <FormControlLabel value="debitCard" control={<Radio />} label="Debit Card" />
                    </RadioGroup>

                    {paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? (
                        <>
                            <TextField
                                label="Card Number"
                                fullWidth
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Expiry Month"
                                fullWidth
                                value={cardDetails.expiryMonth}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiryMonth: e.target.value })}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Expiry Year"
                                fullWidth
                                value={cardDetails.expiryYear}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiryYear: e.target.value })}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="CVV"
                                fullWidth
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                margin="normal"
                                required
                            />
                        </>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOK} color="primary">Cancel</Button>
                    <Button onClick={handlePayment} color="primary">Pay Now</Button>
                </DialogActions>
            </Dialog>

            <div className='md:mx-0 mx-auto space-y-4 max-w-[37rem]'>
                <GoBackButton />
                <div className='space-y-9 lg:space-y-10 '>
                    <h1 className='lg:text-2xl text-xl font-semibold text-gray-600'>
                        Complete Delivery Details
                    </h1>

                    <Fade in={true}>
                        <form
                            className='lg:space-y-8 space-y-7'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                {...register('full_name', { required: 'Full name is required' })}
                                label='Full Name'
                                size='small'
                                error={errors.full_name ? true : false}
                                helperText={errors.full_name ? errors.full_name.message : ''}
                                fullWidth
                                color='success'
                                variant='outlined'
                                margin="normal"
                                className="mb-4"
                            />
                            <TextField
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                                label='Email'
                                size='small'
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email.message : ''}
                                fullWidth
                                color='success'
                                variant='outlined'
                                margin="normal"
                                className="mb-4"
                            />

                            <TextField
                                {...register('address', {
                                    required: 'Address is required',
                                })}
                                label='Delivery Address'
                                size='small'
                                error={errors.address ? true : false}
                                helperText={errors.address ? errors.address.message : ''}
                                fullWidth
                                color='success'
                                variant='outlined'
                                margin="normal"
                                className="mb-4"
                            />

                            <div>
                                <label className='text-[16px] text-gray-600 font-medium' htmlFor='pickup-location'>
                                    Select Pick Up Location
                                </label>
                                <Select
                                    {...register('pickupLocation', { required: 'Pickup location is required' })}
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    id='pickup-location'
                                    fullWidth
                                    size='small'
                                    color='success'
                                    variant='outlined'
                                    margin="normal"
                                    className="mb-4"
                                >
                                    {pickupLocations.map(location => (
                                        <MenuItem key={location.id} value={location.id}>
                                            {location.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                                className='mt-6 py-3'
                            >
                                Proceed to Payment
                            </Button>
                        </form>
                    </Fade>
                </div>
            </div>
        </>
    );
};

export default DeliveryForm;
