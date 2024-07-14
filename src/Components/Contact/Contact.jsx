import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user_id = localStorage.getItem('user_id');
            const accessToken = localStorage.getItem('accessToken');

            if (!user_id || !accessToken) {
                console.error('User ID or Access Token not found in localStorage.');
                return;
            }

            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.post('https://desismart.co.uk/web/contact/create-contact', { ...formData, user_id }, { headers });

            console.log('Form submitted successfully:', response.data);

            // Show toast notification
            toast.success('Thank you! Your message has been sent to our technical team. You will get a solution within a few days.');

            // Optionally, you can show a success message or redirect to a thank-you page here
            setFormData({
                name: '',
                email: '',
                phone_number: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error state or show an error message to the user
            toast.error('Oops! Something went wrong. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        <div className="lg:mb-0 mb-10">
                            <div className="group w-full h-full">
                                <div className="relative h-full">
                                    <img
                                        src="https://images.pexels.com/photos/7564196/pexels-photo-7564196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="ContactUs tailwind section"
                                        className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-[#2E7D32]"
                                    />
                                    <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">Contact us</h1>
                                    <div className="absolute bottom-0 w-full lg:p-11 p-5">
                                        <div className="bg-white rounded-lg p-6 block">
                                            <a className="flex items-center mb-6">
                                                <i className="fas fa-phone text-[#2E7D32]"></i>
                                                <h5 className="text-black text-base font-normal leading-6 ml-5">+44 (0) 7721 528268</h5>
                                            </a>
                                            <a href="mailto:desismart.pnsl@gmail.com" target='/' className="flex items-center mb-6">
                                                <i className="fas fa-envelope text-[#2E7D32]"></i>
                                                <h5 className="text-black text-base font-normal leading-6 ml-5">desismart.pnsl@gmail.com</h5>
                                            </a>

                                            <a href="https://www.google.com/maps/place/Desi+Smart/@52.4312876,-1.8944841,17z/data=!3m1!4b1!4m6!3m5!1s0x48774b85635c1149:0xce24a10a539edf8c!8m2!3d52.4312876!4d-1.8922954!16s%2Fg%2F11tjp80bft?shorturl=1" target='/' className="flex items-center">
                                                <i className="fas fa-location-dot text-[#2E7D32]"></i>
                                                <h5 className="text-black text-base font-normal leading-6 ml-5">2 Addison Rd, King's Heath, Birmingham B14 7EW, United Kingdom</h5>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                            <h2 className="text-black font-bold text-4xl leading-10 mb-11">Let us know how we can help you</h2>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10"
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10"
                                placeholder="Email"
                            />
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10"
                                placeholder="Phone"
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full h-32 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-lg border border-gray-200 focus:outline-none pl-4 mb-10 items-center placeholder:pt-4"
                                placeholder="Leave a comment....."
                            ></textarea>

                            <button type="submit" className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-[#971B1E] bg-[#2E7D32] shadow-sm">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
};

export default ContactForm;
