import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const [orders, setOrders] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [currentTrackingDetails, setCurrentTrackingDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for cancellation modal
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [cancelReason, setCancelReason] = useState('');

    // State for confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const accessToken = localStorage.getItem('accessToken');
                if (!user_id || !accessToken) {
                    console.error('User ID or Access Token not found in localStorage.');
                    setError('User ID or Access Token not found.');
                    return;
                }

                const response = await axios.post(
                    'https://desismart.co.uk/web/order/get-order-by-user-id',
                    { user_id },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Orders fetched:', response.data.data);
                if (response.data.success) {
                    setOrders(response.data.data);
                } else {
                    console.error('Error fetching orders:', response.data.error);
                    setError(response.data.error || 'Error fetching orders.');
                }
                setLoading(false);

            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleTrackClick = (trackingDetails) => {
        setCurrentTrackingDetails(trackingDetails);
        setIsTracking(true);
    };

    const handleCancelClick = (orderId) => {
        setCancelOrderId(orderId);
        setShowCancelModal(true);
    };

    const handleCancelOrder = async () => {
        if (!cancelOrderId || !cancelReason) return;

        try {
            const user_id = localStorage.getItem('user_id');
            const accessToken = localStorage.getItem('accessToken');
            const deleteResponse = await axios.post(
                `https://desismart.co.uk/web/order/delete-order-by-user-id`, 
                { user_id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(deleteResponse.data);
            if (deleteResponse.data.success) {
                setShowCancelModal(false);
                setShowConfirmModal(true);
                // Initiate refund process
                await handleRefund();
            } else {
                console.error('Error deleting order:', deleteResponse.data.error);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const storeAmountInWallet = async (amount) => {
        try {

            localStorage.setItem('walletbalance', amount);

            const user_id = localStorage.getItem('user_id');
            const accessToken = localStorage.getItem('accessToken');
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
            const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // Get current time in HH:MM:SS format
            const response = await axios.post(
                'https://desismart.co.uk/web/wallet/create-wallet',
                {
                    wallet_name: 'Refund',
                    date: currentDate,
                    time: currentTime,
                    amount: amount,
                    user_id: user_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response)
            if (response.data.success) {
                console.log('Amount successfully added to wallet:', response.data);
            } else {
                console.error('Error adding amount to wallet:', response.data.error);
            }
        } catch (error) {
            console.error('Error storing amount in wallet:', error);
        }
    };
    const handleRefund = async () => {
        const cardNumber = localStorage.getItem('cardNumber');
        const monthExpiry = localStorage.getItem('expirationDate');
        const yearExpiry = localStorage.getItem('expirationYear');
        const amount = localStorage.getItem('amount');
        const cvv = localStorage.getItem('cvv');
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('email');
        const pincode = localStorage.getItem('Pincode');

        if (!cardNumber || !monthExpiry || !yearExpiry || !amount || !cvv || !name || !email || !pincode) {
            console.error('Required details not found in localStorage.');
            return;
        }

        let ipAddress = '';
        try {
            // Fetch IP address
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            ipAddress = ipData.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            // Handle IP fetch error if necessary
        }

        try {
            const response = await fetch('http://localhost:8080/http://localhost:3001/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'REFUND',
                    type: 1,
                    countryCode: "GB",
                    currencyCode: "GBP",
                    customerName: name,
                    customerEmail: email,
                    cardCVV: cvv,
                    cardNumber: cardNumber,
                    cardExpiryMonth: monthExpiry,
                    cardExpiryYear: yearExpiry,
                    customerPostcode: pincode,
                    amount: amount,
                    ipAddress: ipAddress, // Add IP address to request body
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Refund successful:', data);

                // Add amount to wallet
                await storeAmountInWallet(amount);

                // Show success modal
                setShowConfirmModal(true);
                setOrders(orders.filter(order => order.order_id !== cancelOrderId));
            } else {
                console.error('Refund failed:', response.statusText);
                setError('Refund failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error processing refund:', error);
            setError('Error occurred during refund. Please try again later.');
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const name = localStorage.getItem('userName');
    return (
        <div className="pt-20 pl-10 pr-10 flex justify-center gap-10">
            <nav className="navbar w-64 bg-[#2E7D32] h-[85vh] rounded-2xl">
                <div className='flex p-4 items-center gap-5'>
                    <div>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
                    </div>
                    <div className='text-2xl font-bold text-white'>
                        Hello, {name}
                    </div>
                </div>
                <ul className="p-7">
                    <li className="mb-4 text-white font-bold">
                        Orders
                        <ul className="ml-4">
                            <li className="mb-2 mt-4">
                                <Link
                                    to="/myorders"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/myorders') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    My Orders
                                </Link>
                                <i className="fas fa-angle-right pl-3"></i>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-4 text-white font-bold">
                        Account
                        <ul className="ml-4">
                            <li className="mb-2 mt-4">
                                <Link
                                    to="/profile"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profileinfo') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Profile Information
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-4 text-white font-bold">
                        {/* Payment */}
                        <ul className="ml-4">
                            <li className="mb-2 mt-4">
                            <Link
                            to="/wallet"
                            className={`text-white hover:text-black transition-all ${isActive('/profile/wallet') ? 'text-blue-600 font-bold' : ''}`}
                        >
                            Wallet
                        </Link>
                        <i className="fas fa-angle-right pl-3 text-white"></i>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <div className='pt-10 md:w-[75%] 3xs:w-[100%]'>
                <div>
                    <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
                </div>
                {orders.length === 0 ? (
                    <p>Your Orders will be visible here.</p>
                ) : (
                    <div className="overflow-x-auto mb-20">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left underline">User Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left underline">Order Details</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left underline">Total Cost</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left underline">Mode of Payment</th>
                                    {/* <th className="py-2 px-4 border-b border-gray-200 text-left underline">Delivery Date</th> */}
                                    <th className="py-2 px-4 border-b border-gray-200 text-left underline">Ordered Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left underline">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => {
                                    let cartDetails;
                                    if (typeof order.cart_details === 'string') {
                                        cartDetails = JSON.parse(order.cart_details);
                                    } else {
                                        cartDetails = order.cart_details;
                                    }
                                    return (
                                        <tr key={order.order_id} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b border-gray-200"><p className='font-bold'>{order.user_name}</p></td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <ul className="list-disc list-inside w-80">
                                                    {cartDetails.map((item, index) => (
                                                        <li key={index}>
                                                            {item.name} - {item.quantity} x {item.price} = {item.total}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">{order.total_cost}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{order.mode_of_payment}</td>
                                            {/* <td className="py-2 px-4 border-b border-gray-200"><p className='w-80'>{order.delivery_date || 'N/A'}</p></td> */}
                                            <td className="py-2 px-4 border-b border-gray-200"><p className='w-56'>{order.time}</p></td>
                                            <td className={`py-2 px-4 border-b border-gray-200 ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>{order.status}</td>
                                            {/* <td className="py-2 px-4 border-b border-gray-200">
                                                <button
                                                    className="bg-[#971B1E] hover:bg-[#2E7D32] transition-all text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleTrackClick(order.trackingDetails)}
                                                >
                                                    Track
                                                </button>
                                            </td> */}
                                            {/* <td className="py-2 px-4 border-b border-gray-200">
                                                {order.tracking_details ? (
                                                    <button
                                                        onClick={() => handleTrackClick(order.tracking_details)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        Track Order
                                                    </button>
                                                ) : (
                                                    'No tracking details'
                                                )}
                                            </td> */}
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <button
                                                    onClick={() => handleCancelClick(order.order_id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Cancel Order
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-2">Cancel Order</h2>
                        <textarea
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            placeholder="Reason for cancellation"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-800 text-white px-10 py-2 rounded hover:bg-red-600 mr-2"
                                onClick={() => setShowCancelModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#2e7d32] hover:bg-[#194a1b] text-white px-10 py-2 rounded"
                                onClick={handleCancelOrder}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg ">
                        <h2 className="text-lg font-bold mb-2">Order Canceled</h2>
                        <p>Your order has been successfully canceled and the refund has been processed.</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-[#2e7d32] hover:bg-[#194a1b] text-white px-10 py-2 rounded"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tracking Modal */}
            {isTracking && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-2">Tracking Details</h2>
                        <p>{currentTrackingDetails}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => setIsTracking(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
