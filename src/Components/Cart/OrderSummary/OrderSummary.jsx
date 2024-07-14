import { Button, useMediaQuery, Checkbox, FormControlLabel } from "@mui/material";
import { groceryContext } from "../../Layout/Layout";
import { useContext, useEffect, useState } from "react";
import { checkoutContext } from "../Cart";
import axios from "axios";

const OrderSummary = () => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext);

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);
  const [extraAmount, setExtraAmount] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);

  // Media Query
  const isMediumScreen = useMediaQuery("(max-width:1024px)");

  const subtotal = Number.parseFloat(
    cartItems.reduce((total, item) => total + Number.parseFloat(item.total), 0)
  );
  const totalBeforeWallet = parseFloat((subtotal + deliveryCharge).toFixed(2));
  const total = parseFloat((useWallet ? Math.max(0, totalBeforeWallet - walletBalance) : totalBeforeWallet).toFixed(2));

  // Function to add item to cart in the database
  const addToCart = async (item) => {
    const accessToken = localStorage.getItem("accessToken");
    const user_id = localStorage.getItem("user_id"); // Adjust this if the user ID is stored elsewhere

    try {
      const response = await axios.post(
        "https://desismart.co.uk/web/cart/create-cart",
        {
          ...item,
          user_id: user_id, // Add user_id to the item object
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to add item to cart:",
        error.response ? error.response.data : error.message
      );
      throw error; // Rethrow the error so it can be handled by the caller
    }
  };

  // Handle proceed to checkout button click
  const handleProceedToCheckout = async () => {
    try {
      // Add each cart item to the database
      for (const item of cartItems) {
        const cartItem = {
          product_name: item.name,
          cart_image: item.img,
          cost: item.price,
          quantity: item.quantity,
          weight: item.unit, // Assuming unit is the weight
          description: "Best Quality", // Add a description field if needed
          discount: 0, // Assuming no discount, update as needed
          subtotal: item.total,
          delivery: deliveryCharge, // Use the dynamic delivery charge
          total_price: (parseFloat(item.total) + deliveryCharge).toFixed(2), // Assuming total includes delivery
          status: "Pending", // Set initial status, update as needed
        };
        await addToCart(cartItem);
      }

      // Store total amount in local storage
      localStorage.setItem("amount", total.toString());

      // Proceed to checkout
      setIsProceedToCheckout(!isProceedToCheckout);
    } catch (error) {
      console.error(
        "Error during the checkout process:",
        error.response ? error.response.data : error.message
      );
      alert(
        "An error occurred while processing your request. Please try again."
      );
    }
  };

  // Function to calculate delivery charge based on pincode and subtotal
  const calculateDeliveryCharge = (pincode, subtotal) => {
    const specialPincodes = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV6', 'CV7', 'CV8', 'CV9'];

    const isSpecialPincode = specialPincodes.some(code => pincode.startsWith(code));
    if (isSpecialPincode) {
      if (subtotal > 30) return 0;
      if (subtotal > 15) return 2.99;
      return 4.99;
    } else {
      if (subtotal > 50) return 0;
      if (subtotal > 30) return 4.99;
      if (subtotal > 15) return 5.99;
      return 6.99;
    }
  };

  // Function to calculate extra amount needed for free delivery
  const calculateExtraAmountForFreeDelivery = (pincode, subtotal) => {
    const specialPincodes = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV6', 'CV7', 'CV8', 'CV9'];

    const isSpecialPincode = specialPincodes.some(code => pincode.startsWith(code));
    if (isSpecialPincode) {
      return subtotal > 30 ? 0 : 30 - subtotal;
    } else {
      return subtotal > 50 ? 0 : 50 - subtotal;
    }
  };

  // Set delivery charge and wallet balance based on pincode from local storage
  useEffect(() => {
    const storedPincode = localStorage.getItem('Pincode');
    const storedWalletBalance = parseFloat(localStorage.getItem('walletbalance')) || 0;
    
    setWalletBalance(storedWalletBalance);

    if (storedPincode) {
      const sanitizedPincode = storedPincode.replace(/['"]+/g, ''); // Remove quotes
      setIsLoadingDelivery(true);
      const charge = calculateDeliveryCharge(sanitizedPincode, subtotal);
      setDeliveryCharge(charge);
      const extraAmount = calculateExtraAmountForFreeDelivery(sanitizedPincode, subtotal);
      setExtraAmount(extraAmount);
      setIsLoadingDelivery(false);
    }
  }, [subtotal]);

  // Toggle wallet usage
  const handleWalletCheckboxChange = (event) => {
    setUseWallet(event.target.checked);
  };

  return (
    <div className="flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1">
      <div className={`lg:space-y-4 sticky top-0 bottom-0 w-full max-w-[25rem] space-y-3`}>
        {/* Title */}
        <h3 className="lg:text-xl text-lg sm:font-semibold font-bold tracking-wide">
          Order Summary
        </h3>

        {/* Wallet Balance */}
        <div className="text-lg font-medium mb-4">
          Wallet Balance: £ {walletBalance.toFixed(2)}
        </div>

        {/* Total Bill */}
        <table className="table-auto h-28 text-sm w-full">
          <tbody>
            {/* Subtotal */}
            <tr className="font-medium lg:text-gray-800 text-gray-600">
              <td>Subtotal</td>
              <td>£ {subtotal.toFixed(2)} </td>
            </tr>
            {/* Delivery Charge */}
            <tr className="font-medium text-sm lg:text-gray-800 text-gray-600">
              <td>Delivery charge</td>
              <td>£ {isLoadingDelivery ? "..." : deliveryCharge.toFixed(2)} </td>
            </tr>
            {/* Add Extra Amount for Free Delivery */}
            {extraAmount > 0 && (
              <tr className="font-medium text-sm lg:text-green-600">
                <td className="">
                  Add Extra <b>£ {extraAmount.toFixed(2)}</b> to get Free Delivery
                </td>
              </tr>
            )}
            {/* Total */}
            <tr className="lg:font-medium font-semibold lg:text-lg">
              <td>Total</td>
              <td style={{ color: "green" }}>£ {total} </td>
            </tr>
          </tbody>
        </table>

        {/* Wallet Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={useWallet}
              onChange={handleWalletCheckboxChange}
              color="success"
            />
          }
          label="Use Wallet Balance"
        />

        {/* Proceed to checkout */}
        <Button
          fullWidth
          onClick={handleProceedToCheckout}
          sx={{
            textTransform: "capitalize",
            transition: "display 1000s ease-in-out",
            display: isProceedToCheckout ? "none" : "block",
          }}
          variant="contained"
          size={isMediumScreen ? "small" : "medium"}
          color="success"
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
