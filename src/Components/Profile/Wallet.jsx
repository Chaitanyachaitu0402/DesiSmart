import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const WalletPage = () => {
    const location = useLocation();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const fetchWalletTransactions = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const accessToken = localStorage.getItem('accessToken');
                
                if (!user_id || !accessToken) {
                    console.error('User ID or Access Token not found in localStorage.');
                    setError('User ID or Access Token not found.');
                    setLoading(false);
                    return;
                }

                const response = await axios.post(
                    'https://desismart.co.uk/web/wallet/get-wallet-by-user-id',
                    { user_id },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Log the full response to inspect its structure
                console.log('Full API Response:', response.data.data);

                // Extract and set the data correctly
                if (response.data.data && response.data.data && response.data.data) {
                    // Ensure the data is properly formatted
                    const fetchedData = response.data.data;
                    // Wrap single object in an array if it's not already an array
                    setTransactions(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format.');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wallet transactions:', error);
                setError('Error fetching wallet transactions. Please try again later.');
                setLoading(false);
            }
        };

        fetchWalletTransactions();
    }, []);

    return (
        <div className="pt-20 pl-10 pr-10 flex gap-10">
            <nav className="w-64 bg-[#2E7D32] h-[85vh] rounded-2xl">
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
                        {/* Payment */}
                        <ul className="ml-4 mt-4">
                        </ul>
                    </li>
                    <li>
                        <Link
                            to=""
                            className={`text-white font-bold hover:text-black transition-all ${isActive('/profile/wallet') ? 'text-blue-600 font-bold' : ''}`}
                        >
                            Wallet
                        </Link>
                        <i className="fas fa-angle-right pl-3 text-white"></i>
                    </li>
                </ul>
            </nav>
            <div className='pt-10 w-[75%]'>
                <div>
                    <h1 className="text-3xl font-bold mb-6">Wallet</h1>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Your Wallet Transactions</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-200 text-left">Action</th>
                                        <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                                        {/* <th className="py-2 px-4 border-b border-gray-200 text-left">Time</th> */}
                                        <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.wallet_id} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b border-gray-200">{transaction.wallet_name}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{transaction.date}</td>
                                            {/* <td className="py-2 px-4 border-b border-gray-200">{transaction.time}</td> */}
                                            <td className={`py-2 px-4 border-b border-gray-200 text-green-600`}> + {transaction.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletPage;
