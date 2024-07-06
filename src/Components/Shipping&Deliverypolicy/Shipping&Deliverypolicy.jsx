import React from 'react';
import aboutimg from '../../assets/about/aboutimg.jpg'
import './Shipping&Deliverypolicy.css'
const About = () => {
       // Scrolling Bug Fixed
       window.scroll({ top: 0 });
    return (
        <div className="about min-h-screen pt-20 px-2 flex items-center justify-around sm:px-6 lg:px-8  gap-10">
            {/* <div className='aboutimg w-[40vw] mb-16'>
        <img src={aboutimg} className='rounded-[10%]' alt="" />
            </div> */}

            <div className="abouttext pt-16">
            <h1 className='text-5xl font-bold mb-5'>Shipping & Delivery Policy</h1>
            <h1 className='text-2xl font-bold mb-5'>Shipping, Delivery & Cancellation</h1>
            <p className='w-[80vw] text-justify leading-7'>We recommend purchase of any perishable goods such as Fruits & Vegetables in Coventry & surrounding locations only for the time being. If customers from outside the CV postcodes like to order fruits & vegetables, they may still order at their own discretion and full consent. Desi S-Mart and Pure N Sure Limited will not be responsible for any claims of whatsoever nature of fruits & vegetables not being fresh or issues related to spoilage during the transit and or delays of delivery which are not in our control and or delayed delivery due to locked doors. </p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Free delivery / shipping for CV Post Codes for order value above £25 and for others Post Codes across the UK minimum Order Value should be £40 to process and arrange postal deliveries (below £40, orders will not be accepted, special requests at the discretion of desismart.co.uk may be accepted subjected to an additional charge of £7.99 to cover handling delivery expenses).</p>
            <p className='w-[80vw] text-justify leading-7'>Once order is submitted on website, confirmation email will be sent. It would contain Order summary, Order Value and Payment Instructions for the order. Orders delivery is scheduled for the following Saturday (For deliveries outside Coventry & surroundings, postal deliveries will be processed within 3-4 days if no fruits & vegetables are in the order. Any postal orders outside CV postcodes with fruits & vegetables will be shipped on Monday and will be delivered during the week days).Ordered Items are subjected to availability.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Vegetables & fruits are ‘Bought to order’ and subject to availability. Once the items are procured for the orders, they cannot be cancelled. Weekly ordering cycle cut-off time is Thursday 8:00PM to deliver then during the same weekend for CV postcode deliveries and Monday dispatch for postal orders; and orders received post this cut-off time will be moved / processed in the following week.</p>
            <h1 className='text-2xl font-bold mb-5'>Order Cancellation & Refunds</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>You have right to cancel your order for dry groceries before the order gets processed and shipped (you will not be able to cancel orders and we will not be able to process refunds for orders with perishable goods such as fruits and vegetables as they are sourced to order and we will have to discard if order is cancelled). If you wish to cancel, please contact us through our Phone call / Text message / WhatsApp message on +44(0)7721528268 to know if the order can be cancelled. And please be aware that if the order is processed, it cannot be cancelled. And if you received damaged or spoiled items, you can inform us by sharing pictures to our WhatsApp number +44(0)7721528268 or email pictures of the evidence at desismart.pnsl@gmail.com and we will be happy to replace / refund.Amounts related to any refunds will only be added to your Account Wallet to use it in your future orders and no money transfers will be made to your bank account or card.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>If there are any damages or spoilage of products, picture evidence to be shared by email or WhatsApp within 24 hrs of receipt of the delivery and if you are not satisfied with any of our supplied products, you can return them within 3 days of receipt of the delivery of the goods (as long as they are in the original pack in sealed and saleable condition) to any of our Distribution Centres in Coventry or Warwick at your own conveyance and costs to get refunded. Human errors are unavoidable, while we try our best to avoid any errors while packing your orders; however, if for any reasons, we supplied with a wrong product than what you have order or missed out any items or received any product which is not within the specifications as per the description (not the images as images in the website are only for the representation purposes may or may not corelate to the actual outer pack), we will try our best either to replace at the earliest and if the replacement not available and or not viable to replace we request you to discard and refund the amount as per the above mentioned refund policy.</p>

            <h1 className='text-2xl font-bold mb-5 mt-8'>Clearance / Sale / Promotional Items</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Items in Clearance / Sale / Promotions are as mentioned in the Title of the item and or as per the description and will not be based on the original package declarations. For example, if an item such as a Tea pack is printed with 500g Free Sugar and if we did not mention the same in our item title or description, it will not have a 500g Free Sugar along with this Tea when we deliver it. The reason for moving this item to clearance / sale section could be due to the fact that either those free packs were never received from our supplier and or those corresponding free pack were damaged and cannot be issued. In conclusion, whatever mentioned in the item description will be the final declaration and you will not have any right to claim whatever mentioned on the original pack pertaining to free combos.</p>
            






            </div>
        </div >
    );
};

export default About;