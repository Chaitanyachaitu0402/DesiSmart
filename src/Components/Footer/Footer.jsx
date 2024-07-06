import { Container, useMediaQuery } from '@mui/material';
import React from 'react';
import logo_black from "../../assets/logo_black.png";
import Facebook from '../../assets/icons/social_icons/Facebook.png';
import Instagram from '../../assets/icons/social_icons/Instagram.png';
import Twitter from '../../assets/icons/social_icons/Twitter.png';
import { LocationOn, Mail, Phone } from "@mui/icons-material";

// This Class for Sub_Component_Link
class Link {
    constructor(name, href) {
        this.name = name;
        this.href = href;
    }
}


const Footer = () => {
    // Media Query
    const isLargeScreen = useMediaQuery('(min-width:1024px)')

    return (
        <footer id='footer' className='text-white' style={{ backgroundColor: '#123F1E' }}>
            <Container sx={{ py: isLargeScreen ? 6.8 : 5 }}>
                <div className='grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 sm:gap-x-2 lg:gap-x-0 gap-x-1.5 sm:gap-y-9 lg:gap-y-0 gap-y-7 '>

                    {/* About Grocery */}
                    <div className='col sm:col-span-2  lg:col-span-2 xl:space-y-6 space-y-4'>
                        {/* Brand_Logo */}
                        <img className='sm:max-h-24 max-h-11 my-auto cursor-pointer' src="https://desismart.co.uk/wp-content/uploads/2023/05/Desismart_Logo.png" alt="grocery" />

                        {/* Description */}
                        <p className='sm:text-sm w-11/12 sm:w-10/12 text-xs tracking-wide'>
                            We provide fresh, vegetables, fruits and more. Enjoy quick delivery and savor the finest ingredients for a delicious dining experience.
                        </p>

                        {/* Social Media Links */}
                        <div className='flex md:space-x-3.5 space-x-3'>
                            {/* Fb */}
                            <a href="https://www.facebook.com/desismartuk" target='/' className='hover:-translate-y-2 transition-all ease-in-out'>
                                <img className='sm:max-h-none max-h-5' src={Facebook} alt="facebook" />
                            </a>

                            {/* Instagram */}
                            <a href="https://www.instagram.com/desis.mart/" target='/' className='hover:-translate-y-2 transition-all ease-in-out'>
                                <img className='sm:max-h-none max-h-5' src={Instagram} alt="Instagram " />
                            </a>

                            {/* Twitter */}
                            <a href="https://twitter.com/DesiSMart2" target='/' className='hover:-translate-y-2 transition-all ease-in-out'>
                                <img className='sm:max-h-none max-h-5' src={Twitter} alt="Twitter" />
                            </a>

                            
                        </div>
                    </div>

                    <>
                        {/* About */}
                        <div className='lg:col-auto md:col sm:col-span-3 col xl:space-y-3.5 space-y-2'>
                        <h3 className='xl:text-xl sm:text-lg text-base font-semibold tracking-wider'>About Us</h3>
                        <div className='sm:space-y-2 space-y-1.5 xl:text-base text-sm'>
                            
                            <a className='block text-sm sm:text-base hover:underline' href="/about">
                                 About Us
                            </a>

                            
                            <a className='block text-[11px] sm:text-base hover:underline' href="/contact">
                                 Our Services
                            </a>

                            
                            
                        </div>
                    </div>
                    
                    {/* Help */}
                    <div className='lg:col-auto md:col sm:col-span-3 col xl:space-y-3.5 space-y-2'>
                        <h3 className='xl:text-xl sm:text-lg text-base font-semibold tracking-wider'>Helpful Link</h3>
                        <div className='sm:space-y-2 space-y-1.5 xl:text-base text-sm'>
                            
                            <a className='block text-sm sm:text-base hover:underline' href="/returnpolicy">
                                 Refund and Returns Policy
                            </a>

                            
                            <a className='block text-[11px] sm:text-base hover:underline' href="/shippingdeliverypolicy">
                                 Shipping & Delivery Policy
                            </a>

                            <a className='block text-[11px] sm:text-base hover:underline' href="/termsandconditions">
                                 Terms & Conditions
                            </a>

                            <a className='block text-[11px] sm:text-base hover:underline' href="/faq">
                                 FAQ
                            </a>

                            
                            
                        </div>
                    </div>
                    </>

                    {/* Contact us */}
                    <div className='lg:col-auto md:col sm:col-span-3 col xl:space-y-3.5 space-y-2'>
                        <h3 className='xl:text-xl sm:text-lg text-base font-semibold tracking-wider'>Contact Us</h3>
                        <div className='sm:space-y-2 space-y-1.5 xl:text-base text-sm'>
                            {/* Phone (fake) */}
                            <a className='block text-sm sm:text-base hover:underline' href="tel:+44 (0) 7721 528268">
                                <Phone fontSize='inherit' /> +44 (0) 7721 528268
                            </a>

                            {/* Email */}
                            <a className='block text-[11px] sm:text-base hover:underline' href="mailto:desismart.pnsl@gmail.com">
                                <Mail fontSize='inherit' /> desismart.pnsl@gmail.com
                            </a>

                            
                            <address>
                                <LocationOn fontSize='inherit' /><a href="https://www.google.com/maps/place/Desi+Smart/@52.4312876,-1.8944841,17z/data=!3m1!4b1!4m6!3m5!1s0x48774b85635c1149:0xce24a10a539edf8c!8m2!3d52.4312876!4d-1.8922954!16s%2Fg%2F11tjp80bft?shorturl=1" target='/' className='hover:underline'>2 Addison Rd, King's Heath, Birmingham B14 7EW, United Kingdom</a>
                            </address>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Copyrights and Credit */}
            <div>
                <hr className='border-gray-600' />
                <div className='text-center flex items-center h-12'>
                    <span className='text-xs  w-full block text-gray-300 tracking-wider'>Developed By <a className='hover:underline' href="http://www.maberucreations.com/" target="_blank" rel="noopener noreferrer"> Maberu Creations </a></span>
                </div>
            </div>
        </footer>
    );
};

// This Sub_Component for footer links
const Links = ({ title, linksArray }) => (
    < div className='col xl:space-y-3.5 space-y-2'>
        {/* Title */}
        <h3 className='xl:text-xl sm:text-lg text-base font-semibold tracking-wider'>{title}</h3>

        {/* Links */}
        <div className='sm:space-y-2 space-y-1.5'>
            {
                linksArray.map((link, i) => (
                    <a key={i}
                        className='block xl:text-base text-sm hover:underline'
                        href={link.href || '#'}>
                        {link.name}
                    </a>
                ))
            }
        </div>
    </div >
)


export default Footer;