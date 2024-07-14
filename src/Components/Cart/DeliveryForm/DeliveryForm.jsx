import React, { useState, useEffect, useContext } from 'react';
import { Button, Fade, TextField, Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, MenuItem, Select } from '@mui/material';
import { useForm } from "react-hook-form";
import { groceryContext } from '../../Layout/Layout';
import { handleSessionStorage } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoBackButton from '../GoBackButton/GoBackButton';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DeliveryForm = () => {
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cardDetails, setCardDetails] = useState({ number: '', expiryMonth: '', expiryYear: '', cvv: '' });
    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupLocations] = useState([
        { id: '1', name: 'Monday– Friday 8:00– 20:00' },
        { id: '2', name: 'Saturday:9:00– 20:00' },
        { id: '3', name: ' Sunday: 9:00– 17:00' }
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

    const addOrderToDatabase = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const user_id = localStorage.getItem('user_id');

        const orderData = {
            user_id: user_id,
            user_name: localStorage.getItem('full_name'),
            cart_details: cartItems,
            total_cost: totalAmount,
            mode_of_payment: paymentMethod,
            delivery_date: pickupLocation,
            time: new Date(),
            status: 'pending'
        };

        try {
            const response = await axios.post('https://desismart.co.uk/order/create-order', orderData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.data.success) {
                alert('Thank you! Your order has been placed.');
                handleSessionStorage('remove', 'cartItems');
                setCartItems([]);
                navigate('/');
            } else {
                console.error('Error storing order:', response.data.error);
            }
        } catch (error) {
            console.error('Error storing order:', error);
        }
    };

    const onSubmit = async (data) => {
        // This could handle form submission if needed
    };

    const handlePaymentSuccess = async () => {
        try {
            await addOrderToDatabase();
        } catch (error) {
            console.error('Failed to process order after payment:', error);
        }
    };

    return (
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
                            className="mb-4 rounded-lg"
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

                        <button
                            onClick={() => navigate('/paymentform')}
                            className='mt-6 py-3 bg-[#2e7d32] text-white p-32 rounded-xl hover:bg-[#1e5221] hover:transition-all'
                        >
                            Proceed to Payment
                        </button>
                    </form>
                </Fade>
            </div>
        </div>
    );
};

export default DeliveryForm;
