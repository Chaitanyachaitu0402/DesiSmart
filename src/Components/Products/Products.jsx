import { Container, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductCardSkeleton } from './ProductCard/ProductCard';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Products = ({ categoryProducts }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryName } = useParams();
    const location = useLocation();

    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    // Credentials
    const eposKey = "4IUQP4AY3GCQHEKN8TFUECT5AE16FK91";
    const eposSecret = "HWQWEWZSXXBO6GHAN2HSPELYCUSZJBSZ";
    const authToken = "NElVUVA0QVkzR0NRSEVLTjhURlVFQ1Q1QUUxNkZLOTE6SFdRV0VXWlNYWEJPNkdIQU4ySFNQRUxZQ1VTWkpCU1o=";

    // Fetch Products from Eposnow API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/https://api.eposnowhq.com/api/v4/Product`,
                    {
                        headers: {
                            Authorization: `Basic ${authToken}`,
                            "Content-Type": "application/json",
                            "epos-api-key": eposKey,
                            "epos-api-secret": eposSecret,
                        },
                    }
                );
                console.log(response.data);
                const products = response.data;
                setAllProducts(products);
                setFilteredProducts(products);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('search') || '';

        if (searchTerm) {
            const filtered = allProducts.filter(product =>
                product.Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(allProducts);
        }
    }, [location.search, allProducts]);

    return (
        <main className='min-h-screen space-y-5 pt-20 mb-9'>
            <Fade in={true}>
                <Container className='xl:space-y-10 sm:space-y-8 space-y-6'>
                    {/* Title */}
                    <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
                        {categoryName ? categoryName : 'All Products'}
                    </h1>

                    {/* Product Cards */}
                    <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5'>
                        {!isLoading ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.Id} product={product} />
                            ))
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
