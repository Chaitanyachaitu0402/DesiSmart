import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import './Profile.css';
import Notification from '../Home/Notification/Notification'; // Import the Notification component

const ProfilePage = () => {
    const location = useLocation();

    // Function to check if the link is active
    const isActive = (path) => location.pathname === path;

    const [userInfo, setUserInfo] = useState({
        user_id: '',
        user_name: '',
        email: '',
        phoneNumber: '',
        Address: '',
        Pincode:'',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('userData'));
        console.log(loggedInUser);
        if (loggedInUser) {
            setUserInfo({
                user_id: loggedInUser.user_id || '',
                user_name: loggedInUser.user_name || '',
                email: loggedInUser.email || '',
                phoneNumber: loggedInUser.mobile_number || '',
                Address: loggedInUser.Address || '',
                Pincode: loggedInUser.Pincode || '',
            });
        }
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage.');
                return;
            }

            const response = await axios.post(
                'https://desismart.co.uk/web/user/update-user',
                userInfo,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('User info updated in database:', response.data);

            // Optionally update userInfo in localStorage if needed
            // localStorage.setItem('userData', JSON.stringify(userInfo));

            // Show notification
            setShowNotification(true);

            // Hide notification after 3 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);

        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    return (
        <div className="md:flex justify-center pt-20 pl-10">
            {/* Navigation Sidebar Code (omitted for brevity) */}
            <nav className=" lg:w-64 3xs:w-[90%] bg-[#2E7D32] h-[85vh] rounded-2xl">
                <div className='flex p-4 items-center gap-5'>
                    <div>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />
                    </div>
                    <div className='text-2xl font-bold text-white'>
                        Hello, {userInfo.user_name}
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
                                    to=""
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profileinfo') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Profile Information
                                </Link>
                            </li>
                            {/* <li className="mb-2">
                                <Link
                                    to="/address"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profile/account/manage-address') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Manage Address
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    <li className="mb-4 text-white font-bold">
                        {/* Payment */}
                        <ul className="ml-4 mt-4">
                            {/* <li className="mb-2">
                                <Link
                                    to="/giftcards"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profile/payment/gift-cards') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Gift Cards
                                </Link>
                            </li> */}
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
            {/* Main Content */}
            <div className=" pt-10 md:pl-10 pr-10 md:w-[80%] mb-10 md:mb-0">
                <h1 className="text-3xl font-bold mb-6">Profile Information</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg ">
                    <div className="mb-4 flex gap-2">
                        <label className="block text-black underline text-xl font-bold mb-2">Username:</label>
                        <p className="text-black font-medium text-xl">{userInfo.user_name}</p>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <label className="block text-black underline text-xl font-bold mb-2">Email:</label>
                        <p className="text-black font-medium text-xl">{userInfo.email}</p>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <label className="block text-black underline text-xl font-bold mb-2">Phone Number:</label>
                        <p className="text-black font-medium text-xl">{userInfo.phoneNumber}</p>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <label className="block text-black underline text-xl font-bold mb-2">Address:</label>
                        <p className="text-black font-medium text-xl">{userInfo.Address}</p>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <label className="block text-black underline text-xl font-bold mb-2">Pincode:</label>
                        <p className="text-black font-medium text-xl">{userInfo.Pincode}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-[#971B1E] hover:bg-[#2E7D32] transition-all text-white font-bold py-2 px-4 rounded"
                            onClick={handleEditClick}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                            <input
                                type="text"
                                name="user_name"
                                value={userInfo.user_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={userInfo.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                            <input
                                type="text"
                                name="Address"
                                value={userInfo.Address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Pincode:</label>
                            <input
                                type="text"
                                name="Pincode"
                                value={userInfo.Pincode}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-[#971B1E] hover:bg-[#2E7D32] transition-all text-white font-bold py-2 px-4 rounded"
                                onClick={handleSaveClick}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Popup */}
            {showNotification && (
                <Notification
                    message="Successfully Your Details are changed."
                    onClose={closeNotification}
                />
            )}
        </div>
    );
};

export default ProfilePage;
