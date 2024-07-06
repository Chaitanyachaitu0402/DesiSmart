import { Button, useMediaQuery, TextField } from '@mui/material';
import { groceryContext } from '../../Layout/Layout';
import { useContext, useState } from 'react';
import { checkoutContext } from '../Cart';
import axios from 'axios';

const OrderSummary = () => {
    // Get Cart Items from Context
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;
    const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext);

    const [pincode, setPincode] = useState('');
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);

    // Media Query
    const isMediumScreen = useMediaQuery('(max-width:1024px)');

    const subtotal = Number.parseFloat(cartItems.reduce((total, item) => total + Number.parseFloat(item.total), 0));
    const total = (subtotal + deliveryCharge).toFixed(2);

    // Predefined delivery charges based on pincode
    const deliveryCharges = {
        "123456": 5.99,
        "654321": 7.99,
        "112233": 4.99,
        // Add more pincode and delivery charge pairs as needed
    };
    const defaultDeliveryCharge = 6.99; // Default delivery charge if pincode not found

    // Function to add item to cart in the database
    const addToCart = async (item) => {
        const accessToken = localStorage.getItem('accessToken');
        const user_id = localStorage.getItem('user_id'); // Adjust this if the user ID is stored elsewhere
    
        try {
            const response = await axios.post('http://localhost:3000/cart/create-cart', {
                ...item,
                user_id: user_id, // Add user_id to the item object
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Failed to add item to cart:", error.response ? error.response.data : error.message);
            throw error; // Rethrow the error so it can be handled by the caller
        }
    };
    

    // Handle proceed to checkout button click
    const handleProceedToCheckout = async () => {
        try {
            // Add each cart item to the database
            for (const item of cartItems) {
                const cartItem = {
                    product_name: item.name,
                    cart_image: item.img,
                    cost: item.price,
                    quantity: item.quantity,
                    weight: item.unit, // Assuming unit is the weight
                    description: "Best Quality", // Add a description field if needed
                    discount: 0, // Assuming no discount, update as needed
                    subtotal: item.total,
                    delivery: deliveryCharge, // Use the dynamic delivery charge
                    total_price: (parseFloat(item.total) + deliveryCharge).toFixed(2), // Assuming total includes delivery
                    status: "Pending" // Set initial status, update as needed
                };
                await addToCart(cartItem);
            }
            // Proceed to checkout
            setIsProceedToCheckout(!isProceedToCheckout);
        } catch (error) {
            console.error("Error during the checkout process:", error.response ? error.response.data : error.message);
            alert("An error occurred while processing your request. Please try again.");
        }
    };

    // Handle pincode change
    const handlePincodeChange = (event) => {
        const newPincode = event.target.value;
        setPincode(newPincode);
        if (newPincode.length === 6) { // Assuming pincode length is 6
            const charge = deliveryCharges[newPincode] || defaultDeliveryCharge;
            setDeliveryCharge(charge);
        }
    };

    return (
        <div className='flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1'>
            <div className={`lg:space-y-4 sticky top-0 bottom-0 w-full max-w-[25rem] space-y-3`}>
                {/* Title */}
                <h3 className='lg:text-xl text-lg sm:font-semibold font-bold tracking-wide'>Order Summary</h3>

                {/* Total Bill */}
                <table className='table-auto h-28 text-sm w-full'>
                    <tbody>
                        {/* Subtotal */}
                        <tr className='font-medium lg:text-gray-800 text-gray-600'>
                            <td>Subtotal</td>
                            <td>£ {subtotal.toFixed(2)} GBP </td>
                        </tr>
                        {/* Delivery Charge */}
                        <tr className='font-medium text-sm lg:text-gray-800 text-gray-600'>
                            <td>Delivery charge</td>
                            <td>£ {isLoadingDelivery ? '...' : deliveryCharge.toFixed(2)} GBP</td>
                        </tr>
                        {/* Add Extra 20 pounds */}
                        <tr className='font-medium text-sm lg:text-green-600'>
                            <td className=''>Add Extra <b>£ 20</b> to get Discount</td>
                        </tr>
                        {/* Total */}
                        <tr className='lg:font-medium font-semibold lg:text-lg'>
                            <td>Total</td>
                            <td style={{ color: 'green' }}>£ {total} GBP</td>
                        </tr>
                    </tbody>
                </table>

                {/* Pincode Input */}
                <TextField
                    fullWidth
                    label="Enter Pincode"
                    variant="outlined"
                    value={pincode}
                    onChange={handlePincodeChange}
                    sx={{ mb: 2 }}
                />

                {/* Proceed to checkout */}
                <Button
                    fullWidth
                    onClick={handleProceedToCheckout}
                    sx={{ textTransform: 'capitalize', transition: 'display 1000s ease-in-out', display: isProceedToCheckout ? 'none' : 'block' }}
                    variant='contained'
                    size={isMediumScreen ? 'small' : 'medium'}
                    color='success'>
                    Proceed to checkout
                </Button>
            </div>
        </div>
    );
};

export default OrderSummary;
