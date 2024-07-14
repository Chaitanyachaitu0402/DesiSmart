import { Container, Fade } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import ProductCard, { ProductCardSkeleton } from './EachCategoryProductCard/EachCategoryProduct';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { groceryContext } from '../Layout/Layout'; // Add import for groceryContext

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openAlert, setOpenAlert] = useState(false); // State for success alert
    const { categoryId } = useParams(); // Get the categoryId from the URL params

    const { cartItemsState } = useContext(groceryContext); // Use groceryContext
    const [cartItems, setCartItems] = cartItemsState;

    // const eposKey = "4IUQP4AY3GCQHEKN8TFUECT5AE16FK91";
    // const eposSecret = "HWQWEWZSXXBO6GHAN2HSPELYCUSZJBSZ";
    // const authToken = "NElVUVA0QVkzR0NRSEVLTjhURlVFQ1Q1QUUxNkZLOTE6SFdRV0VXWlNYWEJPNkdIQU4ySFNQRUxZQ1VTWkpCU1o=";

    // Fetch Category details from Eposnow API based on categoryId
    const fetchCategoryDetails = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(
                `https://desismart.co.uk/web/categories/get-all-categories/${categoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                        // "epos-api-key": eposKey,
                        // "epos-api-secret": eposSecret,
                    },
                }
            );
            setCategoryName(response.data.Name);
        } catch (error) {
            console.error("Error fetching category details:", error);
        }
    };

    // Fetch All Products from Eposnow API
    const fetchProducts = async () => {
        setIsLoading(true); // Set loading state

        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(
                `https://desismart.co.uk/web/product/get-all-product`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                        // "epos-api-key": eposKey,
                        // "epos-api-secret": eposSecret,
                    },
                }
            );
            const allProducts = response.data.data;
            setProducts(allProducts);
            // Filter products based on categoryId
            const filtered = allProducts.filter(product => product.CategoryId.toString() === categoryId);
            setFilteredProducts(filtered);
            setIsLoading(false); // Set loading state to false after successful fetch
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsLoading(false); // Set loading state to false on error
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
        fetchProducts();
    }, [categoryId]); // Dependency on categoryId

    const handleAddToCart = (product, quantity) => {
        const existingProduct = cartItems.find(item => item.id === product.Id);

        const targetedProduct = {
            id: product.Id,
            name: product.Name,
            price: product.SalePrice,
            quantity: existingProduct ? existingProduct.quantity + quantity : quantity,
            total: ((existingProduct ? existingProduct.quantity + quantity : quantity) * product.SalePrice).toFixed(2),
        };

        const updatedCartItems = existingProduct
            ? cartItems.map(item => item.id === product.Id ? targetedProduct : item)
            : [...cartItems, targetedProduct];

        setCartItems(updatedCartItems);
    };

    return (
        <main className='min-h-screen space-y-5 pt-20 mb-9'>
            <Fade in={true}>
                <Container className='xl:space-y-10 sm:space-y-8 space-y-6'>
                    {/* Title */}
                    <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
                        {categoryName || 'Products'}
                    </h1>

                    {/* Success Alert */}

                    {/* Product Cards */}
                    <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5'>
                        {!isLoading ? (
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.Id} product={product} onAddToCart={handleAddToCart} />
                                ))
                            ) : (
                                <p>No products found for this category.</p>
                            )
                        ) : (
                            Array.from({ length: 8 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                        )}
                    </section>
                </Container>
            </Fade>
        </main>
    );
};

export default Products;
