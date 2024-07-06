import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WalletPage = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const [transactions] = useState([
        {
            id: '1',
            date: '2023-06-01',
            description: 'Deposit',
            amount: '+$100.00'
        },
        {
            id: '2',
            date: '2023-06-02',
            description: 'Purchase',
            amount: '-$50.00'
        },
        {
            id: '3',
            date: '2023-06-03',
            description: 'Withdrawal',
            amount: '-$20.00'
        }
    ]);

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
                            <li className="mb-2">
                                <Link
                                    to="/savedcards"
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profile/payment/saved-cards') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Saved Cards
                                </Link>
                            </li>
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
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Your Wallet Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Transaction ID</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b border-gray-200">{transaction.id}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{transaction.date}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{transaction.description}</td>
                                        <td className={`py-2 px-4 border-b border-gray-200 ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{transaction.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
