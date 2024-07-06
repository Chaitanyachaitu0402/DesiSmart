import React from 'react';
import aboutimg from '../../assets/about/aboutimg.jpg'
import './FAQ.css'
const About = () => {
       // Scrolling Bug Fixed
       window.scroll({ top: 0 });
    return (
        <div className="about min-h-screen pt-20 px-2 flex items-center justify-around sm:px-6 lg:px-8  gap-10">
            {/* <div className='aboutimg w-[40vw] mb-16'>
        <img src={aboutimg} className='rounded-[10%]' alt="" />
            </div> */}

            <div className="abouttext pt-16">
            <h1 className='text-5xl font-bold mb-5'>FAQ</h1>
            <p className='w-[80vw] text-justify leading-7'>After you have placed an order, you will receive an email confirming that your order has been received. And after making the payment, an order confirmation email with an update on your order will be sent. Your order will be delivered on the following Saturday provided orders received prior to Thursday 8:00pm. If you wish to collect groceries (excluding vegetables), you have an option to visit our depot locations in Coventry and Warwick and collect your order (please gives us a call and agree your pick up time).</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Orders placed between Sunday to Thursday (before 8.00pm on Thursday) – those orders will be dispatched on the following Saturday for the delivery.Orders placed on Fridays or Saturdays – those order will be dispatched on the next Saturday.If there are no vegetables in the order, you may come and pick the products from our Distribution Centres located in Coventry or Warwick.Please note Bank Holidays may affect the above routine.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Desi S-Mart has pride in always offering competitive pricing both for supermarkets and online. While supermarkets may factor their pricing based shop rents and other overheads, pricing for online products comes with the costs of picking, packing, and also shipping costs needs to be factored in the cost of the product.Despite of all these challenges our promise is to keep our prices always competitive when compared.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>At present, we are offering Self Collection Service from the following locations on pre arranged basis.</p>
            <ul className='list-disc ml-5'>
                <li>Coventry: 14 Roberts Grove CV23FU</li>
                <li>Warwick: 38 Shakespeare Avenue, CV34 6JR</li>
            </ul>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Yes, this is available for Dry Groceries only and if you like to collect on the following day, please let us know in the “Additional notes” section when you place an order or you can contact us for the collection time.</p>







            </div>
        </div >
    );
};

export default About;