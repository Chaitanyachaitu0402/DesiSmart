import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from "./Components/Products/Products";
import AllCategories from "./Components/AllCategories/AllCategories";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import About from "./Components/About/About";
import Login from "./Components/Authantication/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Cart from "./Components/Cart/Cart";
import Contact from "./Components/Contact/Contact";
import ProfilePage from './Components/Profile/ProfilePage';
import Myorders from "./Components/Profile/MyOrders";
import Giftcards from "./Components/Profile/Giftcards";
import Savedcards from "./Components/Profile/Savedcards";
import Wallet from "./Components/Profile/Wallet";
import LoadingScreen from './Components/LoadingScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Returnpolicy from "./Components/Returnpolicy/Returnpolicy";
import ShippingDeliverypolicy from "./Components/Shipping&Deliverypolicy/Shipping&Deliverypolicy";
import Termsandconditions from './Components/Terms&Conditions/Terms&Conditions';
import FAQ from './Components/FAQ/FAQ';
import Forgotpassword from './Components/Forgot Password/Forgotpassword';
import Createpassword from './Components/CreatePassword/CreatePassword';
import EachCategoryProduct from './Components/EachCategoryProduct/EachCategoryProduct';
import Paymentform from './Components/Paymentform';

const AppWrapper = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingScreen />}
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/about" element={<About />} />
          <Route path="/returnpolicy" element={<Returnpolicy />} />
          <Route path="/shippingdeliverypolicy" element={<ShippingDeliverypolicy />} />
          <Route path="/termsandconditions" element={<Termsandconditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/createpassword" element={<Createpassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Paymentform" element={<Paymentform />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/myorders" element={<Myorders />} />
            <Route path="/giftcards" element={<Giftcards />} />
            <Route path="/savedcards" element={<Savedcards />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>

          <Route path="/contact" element={<Contact />} />
          
          {/* Route for displaying products based on category */}
          <Route path="/categories/:categoryId/eachcategoryproduct" element={<EachCategoryProduct categoryProducts />} />

          {/* Route for handling 404 Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default AppWithRouter;
