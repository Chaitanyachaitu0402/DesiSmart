import React from 'react';
import aboutimg from '../../assets/about/aboutimg.jpg'
import './About.css'
const About = () => {
       // Scrolling Bug Fixed
       window.scroll({ top: 0 });
    return (
        <div className="about min-h-screen pt-20 px-2 flex items-center justify-around sm:px-6 lg:px-8  gap-10">
            <div className='aboutimg w-[40vw] mb-16'>
        <img src={aboutimg} className='rounded-[10%]' alt="" />
            </div>

            <div className="abouttext">
            <h1 className='text-6xl font-bold mb-5'>About Us</h1>
            <p className='w-[45vw] text-justify leading-7'><b>Desimart</b> is a leading grocery company dedicated to bringing the finest and freshest products to your doorstep. Specializing in high-quality, locally sourced produce, Desimart ensures that every item on your grocery list meets the highest standards of freshness and quality. Our extensive range of products includes fresh fruits and vegetables, pantry staples, dairy products, and specialty items to cater to all your culinary needs. </p>
            <p className='w-[45vw] text-justify leading-7 mt-5 mb-10'>With a <b>User-friendly online platform</b>, Desimart makes shopping convenient and hassle-free, allowing you to browse, select, and order from the comfort of your home. We pride ourselves on our efficient delivery service, ensuring your groceries arrive promptly and in perfect condition. Committed to sustainability, Desimart supports local farmers and producers, promoting eco-friendly practices throughout our supply chain. Our customer-centric approach ensures that every shopper enjoys a seamless and satisfying experience. Choose Desimart for all your grocery needs and discover the joy of quality and convenience in every purchase.</p>
            </div>
        </div >
    );
};

export default About;