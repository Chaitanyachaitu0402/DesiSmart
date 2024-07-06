import React from 'react';
import aboutimg from '../../assets/about/aboutimg.jpg'
import './Terms&Conditions.css'
const About = () => {
       // Scrolling Bug Fixed
       window.scroll({ top: 0 });
    return (
        <div className="about min-h-screen pt-20 px-2 flex items-center justify-around sm:px-6 lg:px-8  gap-10">
            {/* <div className='aboutimg w-[40vw] mb-16'>
        <img src={aboutimg} className='rounded-[10%]' alt="" />
            </div> */}

            <div className="abouttext pt-16">
            <h1 className='text-5xl font-bold mb-5'>Terms & Conditions</h1>
            <p className='w-[80vw] text-justify leading-7'>This website is operated by Pure N Sure Limited, using the website <b>www.desismart.co.uk</b> (here forth referred to as, “this store”, “the store”, “online store”, “this site”, “the site”, “we”, “us” or “our”) you are agreeing to the terms and conditions (here forth referred to as “the Terms” or “this Agreement”) set out below which apply to the use of both the website and the products offered through it.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>A reference to a “product” or “item” here forth refers to any item purchased or available for purchase through the site. These conditions apply to all products and services provided by the site to any customers or users of our site (here forth referred to as “the Customer” or “you”) and prevail over the conditions of business of any of our suppliers.</p>
            <p className='w-[80vw] text-justify leading-7'>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms & Conditions”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms & Conditions apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Any new features or tools which are added to the current store shall also be subject to the Terms & Conditions. You can review the most current version of the Terms & Conditions at any time on this page. We reserve the right to update, change or replace any part of the Terms & Conditions by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms & Conditions. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Any Seasonal Promotions and Discounts are not applicable on items under Sale & Clearance categories. And discount will not be applied on those items.</p>
            <h1 className='text-5xl font-bold mb-5'>Customer’s Obligations:</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>By agreeing to these Terms & Conditions, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).All our products purchased on this store is for ‘Personal Use’ only and may NOT be used for commercial purposes.You must not infect the website with any worms or viruses or any code of a destructive nature.Without limiting the generality of any other provision of these Terms, if you default negligently or wilfully in any of the obligations set forth in these Terms you shall be liable for all the losses and damages that this may cause to the Site.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>A breach or violation of any of the Terms will result in an immediate termination of your services and all the orders that are currently under processing.These terms are governed by English law. Any contract for the purchase of goods from this site and any dispute or claim arising out of or in connection with any such contract will be governed by English law. You and we both agree that the courts of England and Wales will have non-exclusive jurisdiction. However, if you are a resident in Northern Ireland you may also bring proceedings in Northern Ireland, and if you are a resident in Scotland you may also bring proceedings in Scotland.</p>







            </div>
        </div >
    );
};

export default About;