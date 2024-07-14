import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const [orders, setOrders] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [currentTrackingDetails, setCurrentTrackingDetails] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const accessToken = localStorage.getItem('accessToken');
                if (!user_id || !accessToken) {
                    console.error('User ID or Access Token not found in localStorage.');
                    return;
                }

                const response = await axios.post(
                    'https://desismart.co.uk/order/get-order-by-user-id',
                    { user_id },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Orders fetched:', response.data);
                setOrders(response.data.orders); // Assuming response.data.orders is an array of orders

            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders. Please try again later.');
            }
        };

        fetchOrders();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleTrackClick = (trackingDetails) => {
        setCurrentTrackingDetails(trackingDetails);
        setIsTracking(true);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="pt-20 pl-10 pr-10 flex justify-center gap-10">
            <nav className="navbar w-64 bg-[#2E7D32] h-[85vh] rounded-2xl">
                <div className='flex p-4 items-center gap-5'>
                    <div>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
                    </div>
                    <div className='text-2xl font-bold text-white'>
                        Hello
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
                        Payment
                        <ul className="ml-4 mt-4">
                            <li className="mb-2">
                                <Link
                                    to="/giftcards"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profile/payment/gift-cards') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Gift Cards
                                </Link>
                            </li>
                            {/* <li className="mb-2">
                                <Link
                                    to="/savedcards"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profile/payment/saved-cards') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Saved Cards
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    <li>
                        <Link
                            to="/wallet"
                            className={`text-white font-bold hover:text-black transition-all ${isActive('/profile/wallet') ? 'text-blue-600 font-bold' : ''}`}
                        >
                            Wallet
                        </Link>
                        <i className="fas fa-angle-right pl-3 text-white"></i>
                    </li>
                </ul>
            </nav>
            <div className='pt-10 md:w-[75%] 3xs:w-[100%]'>
                <div>
                    <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
                </div>
                <div className="overflow-x-auto">
                    {orders !== null ? (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Order ID</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Total</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Status</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Items</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {orders.map((order) => (
                                    <tr key={order.order_id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b border-gray-200">{order.order_id}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{order.mode_of_payment}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{order.total}</td>
                                        <td className={`py-2 px-4 border-b border-gray-200 ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>{order.status}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <ul className="list-disc list-inside list-none">
                                                {order.items.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <button
                                                className="bg-[#971B1E] hover:bg-[#2E7D32] transition-all text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleTrackClick(order.trackingDetails)}
                                            >
                                                Track
                                            </button>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>

            {isTracking && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Order Tracking Details</h2>
                        <p>{currentTrackingDetails}</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
