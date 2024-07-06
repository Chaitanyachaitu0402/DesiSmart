import { useNavigate, NavLink } from "react-router-dom";
import EmptyCart from './EmptyCart/EmptyCart';
import { Container } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";
import OrderSummary from "./OrderSummary/OrderSummary";
import CartItems from "./CartItems/CartItems";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import axios from "axios";
import { groceryContext } from '../Layout/Layout';

export const checkoutContext = createContext();

const Cart = () => {
    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    // Get Cart Items from Context
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;

    const [isProceedToCheckout, setIsProceedToCheckout] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status

    useEffect(() => {
        // Check if user is logged in (using localStorage, session, or any auth method you use)
        const user_id = localStorage.getItem("user_id"); // Assuming user_id is stored in localStorage
        if (user_id) {
            setIsLoggedIn(true);
            fetchCartItems(user_id);
        } else {
            setIsLoggedIn(false);
            setCartItems([]); // Clear cart items for non-logged-in users
        }
    }, []);

    const fetchCartItems = async (user_id) => {
        try {
            // Fetch cart items from backend based on user_id
            const response = await axios.get(`http://localhost:3000/cart/get-user-by-id/${user_id}`);
            setCartItems(response.data.cartItems); // Update cart items based on backend response
        } catch (error) {
            console.error("Error fetching cart items:", error);
            // Handle error, show message to user, etc.
        }
    };

    const navigate = useNavigate();

    if (!isLoggedIn) {
        // Redirect to login page if user isn't logged in
        navigate("/login"); // Adjust the path as per your application's route for login
        return null; // Render nothing until redirection happens
    }

    return (
        <checkoutContext.Provider value={[isProceedToCheckout, setIsProceedToCheckout]}>
            <section className={`${cartItems.length > 0 ? "min-h-screen " : "h-screen "}pt-20 pb-10`}>
                {cartItems.length > 0 ? (
                    <Container sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
                        <section className="grid lg:gap-x-0 gap-x-5 gap-y-8 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-12 ">
                            <div className="col xl:col-span-2 lg:col-span-1 md:col-span-8">
                                {!isProceedToCheckout ? <CartItems /> : <DeliveryForm />}
                            </div>
                            <OrderSummary />
                        </section>
                    </Container>
                ) : (
                    <EmptyCart />
                )}
            </section>
        </checkoutContext.Provider>
    );
};

export default Cart;
