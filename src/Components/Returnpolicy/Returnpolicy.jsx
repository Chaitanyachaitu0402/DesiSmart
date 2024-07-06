import React from 'react';
import aboutimg from '../../assets/about/aboutimg.jpg'
import './Returnpolicy.css'
const About = () => {
       // Scrolling Bug Fixed
       window.scroll({ top: 0 });
    return (
        <div className="about min-h-screen pt-20 px-2 flex items-center justify-around sm:px-6 lg:px-8  gap-10">
            {/* <div className='aboutimg w-[40vw] mb-16'>
        <img src={aboutimg} className='rounded-[10%]' alt="" />
            </div> */}

            <div className="abouttext pt-16">
            <h1 className='text-5xl font-bold mb-5'>Refund and Returns Policy</h1>
            <h1 className='text-2xl font-bold mb-5'>Overview</h1>
            <p className='w-[80vw] text-justify leading-7'>Our refund and returns policy lasts 30 days. If 30 days have passed since your purchase, we can’t offer you a full refund or exchange.To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases. </p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Additional non-returnable items:</p>
            <ul className='list-disc ml-5'>
                <li>Gift cards</li>
                <li>Downloadable software products</li>
                <li>Some health and personal care items</li>
            </ul>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>To complete your return, we require a receipt or proof of purchase.Please do not send your purchase back to the manufacturer.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>There are certain situations where only partial refunds are granted:</p>
            <ul className='list-disc ml-5'>
                <li>Book with obvious signs of use</li>
                <li>CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.</li>
                <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</li>
                <li>Any item that is returned more than 30 days after delivery</li>
            </ul>
            <h1 className='text-2xl font-bold mb-5 mt-8'>Refunds</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
            <h1 className='text-2xl font-bold mb-5'>Late or missing refunds</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>If you haven’t received a refund yet, first check your bank account again.Then contact your credit card company, it may take some time before your refund is officially posted.Next contact your bank. There is often some processing time before a refund is posted.If you’ve done all of this and you still have not received your refund yet, please contact us at desismart.pnsl@gmail.com.</p>
            <h1 className='text-2xl font-bold mb-5'>Sale Items</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Only regular priced items may be refunded. Sale items cannot be refunded.</p>
            <h1 className='text-2xl font-bold mb-5'>Exchanges</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at email address and send your item to: 2a Addison Rd, Kings Heath, Birmingham, B14 7EW.</p>
            <h1 className='text-2xl font-bold mb-5'>Gifts</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and they will find out about your return.</p>
            <h1 className='text-2xl font-bold mb-5'>Shipping returns</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>To return your product, you should mail your product to: 2a Addison Rd, Kings Heath, Birmingham, B14 7EW You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.Depending on where you live, the time it may take for your exchanged product to reach you may vary.If you are returning more expensive items, you may consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
            <h1 className='text-2xl font-bold mb-5'>Need Help?</h1>
            <p className='w-[80vw] text-justify leading-7 mt-5 mb-10'>Contact us at desismart.pnsl@gmail.com for questions related to refunds and returns.</p>






            </div>
        </div >
    );
};

export default About;