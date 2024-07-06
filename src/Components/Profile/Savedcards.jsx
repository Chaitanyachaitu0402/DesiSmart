import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SavedCardsPage = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const [showPopup, setShowPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    // Dummy data for saved cards
    const savedCards = [
        {
            id: 1,
            cardType: 'Visa',
            last4Digits: '1234',
            expiryDate: '12/25',
            billingAddress: '123 Street, City, Country'
        },
        {
            id: 2,
            cardType: 'Mastercard',
            last4Digits: '5678',
            expiryDate: '08/23',
            billingAddress: '456 Avenue, Town, Country'
        }
    ];

    const openPopup = (card) => {
        setSelectedCard(card);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedCard(null);
    };

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
                                    to=""
                                    className={`text-white font-normal hover:text-black transition-all ${isActive('/profile/payment/saved-cards') ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    Saved Cards
                                </Link>
                            </li>
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
            <div className='pt-10 md:w-[75%]'>
                <div>
                    <h1 className="text-3xl font-bold mb-6">Saved Cards</h1>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Your Saved Cards</h2>
                    <ul className="divide-y divide-gray-200">
                        {savedCards.map(card => (
                            <li key={card.id} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">{card.cardType} ending in {card.last4Digits}</p>
                                        <p className="text-gray-500 text-sm">Expiry Date: {card.expiryDate}</p>
                                        <p className="text-gray-500 text-sm">Billing Address: {card.billingAddress}</p>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-[#971B1E] hover:bg-[#2E7D32] transition-all text-white font-bold py-2 px-4 rounded"
                                            onClick={() => openPopup(card)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Popup Dialog */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">{selectedCard.cardType} Card Details</h2>
                        <p className="text-gray-700">Card ending in {selectedCard.last4Digits}</p>
                        <p className="text-gray-700">Expiry Date: {selectedCard.expiryDate}</p>
                        <p className="text-gray-700">Billing Address: {selectedCard.billingAddress}</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={closePopup}
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

export default SavedCardsPage;
