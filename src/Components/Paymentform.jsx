import React, { useState, useEffect } from 'react';
import Top from '../assets/Payments/top.png';
import Bottom from '../assets/Payments/Bottom.png';
import Modal from 'react-modal';
import Card from '../assets/Payments/cards.png'

// Modal Styling
const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80vw',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: 'none',
        borderRadius: '8px',
        textAlign: 'center',
    },
};

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        expirationYear: '',
        cvv: '',
        cardHolder: '',
        address: '',
        postalCode: '',
        email: '',
        phone: '',
        country: '', // Assuming this is part of your form data
    });

    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const storedAmount = localStorage.getItem('amount');
        const storedAddress = localStorage.getItem('Address');
        const storedPostalCode = localStorage.getItem('Pincode');
        const storedUserName = localStorage.getItem('userName');
        // const storedemail = localStorage.getItem('email');
        // const storedCardNumber = localStorage.getItem('cardNumber');
        // const storedExpirationDate = localStorage.getItem('expirationDate');
        // const storedExpirationYear = localStorage.getItem('expirationYear');
        // const storedCvv = localStorage.getItem('cvv');

        if (storedAmount) {
            setAmount(parseFloat(storedAmount));
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            address: storedAddress || '',
            postalCode: storedPostalCode || '',
            cardHolder: storedUserName || '',
            // email: storedemail || '',
            // cardNumber: storedCardNumber || '',
            // expirationDate: storedExpirationDate || '',
            // expirationYear: storedExpirationYear || '',
            // cvv: storedCvv || '',
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (['cardNumber', 'expirationDate', 'expirationYear', 'cvv'].includes(name)) {
            localStorage.setItem(name, value);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expirationDate) newErrors.expirationDate = 'Expiration date is required';
        if (!formData.expirationYear) newErrors.expirationYear = 'Expiration year is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.cardHolder) newErrors.cardHolder = 'Card holder is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.country) newErrors.country = 'Country is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            setLoading(true); // Start loading

            try {
                const response = await fetch('http://localhost:8080/http://localhost:3001/pay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'SALE',
                        type: 1,
                        countryCode: "GB",
                        currencyCode: "GBP",
                        customerName: formData.cardHolder,
                        customerEmail: formData.email,
                        cardCVV: formData.cvv,
                        customerAddress: formData.address,
                        cardNumber: formData.cardNumber,
                        cardExpiryMonth: formData.expirationDate,
                        cardExpiryYear: formData.expirationYear,
                        customerPostcode: formData.postalCode,
                        customerPhoneNumber: formData.phone,
                        customerCountry: formData.country,
                        threeDSVersion: "2",
                        threeDSRedirectURL: "https://desi-smart-k2y2xn9xm-chaitanyachaitu0402s-projects.vercel.app/",
                        amount: amount,
                    }),
                });

                setLoading(false); // Stop loading

                if (response.ok) {
                    const data = await response.json();
                    console.log('Payment successful:', data);

                    // Show success modal
                    setModalMessage('Hola! Payment Successful! Your Order has been Placed. Your Order will be delivered in few days');
                    setModalIsOpen(true);

                    // Now, call your function to store order details in the database
                    await addOrderToDatabase();

                    // Optionally, you can redirect after some time
                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 1000); // Redirect after 5 seconds
                } else {
                    console.error('Payment failed:', response.statusText);
                    setModalMessage('Payment failed. Please try again later.');
                    setModalIsOpen(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setModalMessage('Error occurred during payment. Please try again later.');
                setModalIsOpen(true);
            }
        }
    };

    const addOrderToDatabase = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const user_id = localStorage.getItem('user_id');

        const orderData = {
            user_id: user_id,
            user_name: localStorage.getItem('userName'),
            cart_details: sessionStorage.getItem('grocery_cartItems'), // Replace with your cart data
            total_cost: amount,
            mode_of_payment: 'Credit Card', // Adjust this based on your payment form
            delivery_date: 'Some Date', // Replace with actual delivery date logic
            time: new Date(),
        };

        try {
            const response = await fetch('https://desismart.co.uk/web/order/create-order', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Order stored:', data);
            } else {
                console.error('Error storing order:', response.statusText);
            }
        } catch (error) {
            console.error('Error storing order:', error);
        }
    };

    return (
        <div>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div className="w-full max-w-3xl mx-auto p-8 mt-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-lg font-medium mb-6 flex justify-center items-center">
                        <img className='mt-5 w-[25vw]' src={Top} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
                                    Cardholder's Name
                                </label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    id="cardHolder"
                                    placeholder="Full Name"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.cardHolder ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.cardHolder && <span className="text-red-500 text-sm">{errors.cardHolder}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    id="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber}</span>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiration Month
                                </label>
                                <input
                                    type="text"
                                    name="expirationDate"
                                    id="expirationDate"
                                    placeholder="MM"
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.expirationDate ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.expirationDate && <span className="text-red-500 text-sm">{errors.expirationDate}</span>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="expirationYear" className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiration Year
                                </label>
                                <input
                                    type="text"
                                    name="expirationYear"
                                    id="expirationYear"
                                    placeholder="YYYY"
                                    value={formData.expirationYear}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.expirationYear ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.expirationYear && <span className="text-red-500 text-sm">{errors.expirationYear}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    name="cvv"
                                    id="cvv"
                                    placeholder="CVV"
                                    // value={formData.cvv}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.cvv ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.address ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    placeholder="Postal Code"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.postalCode ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.phone ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className={`w-full py-3 px-4 border ${errors.country ? 'border-red-500' : 'border-gray-400'} rounded-lg focus:outline-none focus:border-[#971b1e]`}
                                />
                                {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-[30vw] py-3 px-4 bg-[#2e7d32] hover:bg-[#1a4c1d] text-white font-medium rounded-lg focus:outline-none focus:bg-[#4a0e10]">
                                Pay £{amount.toFixed(2)}
                            </button>
                        </div>
                        <div className="text-lg font-medium mb-6 flex justify-center items-center">
                        <img className='mt-10' src={Card} alt="" />
                    </div>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Payment Status"
                style={customModalStyles}>
                <h2>{modalMessage}</h2>
                <button onClick={() => setModalIsOpen(false)} className="mt-4 px-4 py-2 bg-[#971b1e] text-white rounded-lg">
                    Close
                </button>
            </Modal>
            <div className="text-lg font-medium mb-6 flex justify-center items-center">
                        <img className='mt-5 w-[25vw]' src={Bottom} alt="" />
                        
            </div>
        </div>
    );
};

export default PaymentForm;
