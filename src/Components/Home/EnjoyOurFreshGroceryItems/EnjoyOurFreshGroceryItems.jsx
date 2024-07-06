import { Button, Container, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard, { ProductCardSkeleton } from '../../Products/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EnjoyOurFreshGroceryItems = () => {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // MediaQuery
    const isExtraSmallScreen = useMediaQuery('(max-width: 640px)');

    // Eposnow API keys and authentication
    const eposKey = "4IUQP4AY3GCQHEKN8TFUECT5AE16FK91";
    const eposSecret = "HWQWEWZSXXBO6GHAN2HSPELYCUSZJBSZ";
    const authToken = "NElVUVA0QVkzR0NRSEVLTjhURlVFQ1Q1QUUxNkZLOTE6SFdRV0VXWlNYWEJPNkdIQU4ySFNQRUxZQ1VTWkpCU1o=";

    const categoryIds = {
        Biscuits: 1, // Replace with actual category ID
        Breakfast: 2, // Replace with actual category ID
        "DryFruits and Nuts": 3 // Replace with actual category ID
    };

    // Fetch products based on selected category
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const categoryName = Object.keys(categoryIds)[selectedCategory];
                const categoryId = categoryIds[categoryName];

                const response = await axios.get(
                    `http://localhost:8080/https://api.eposnowhq.com/api/v4/Product?CategoryId=${categoryId}`,
                    {
                        headers: {
                            Authorization: `Basic ${authToken}`,
                            "Content-Type": "application/json",
                            "epos-api-key": eposKey,
                            "epos-api-secret": eposSecret,
                        },
                    }
                );
                setItems(response.data.slice(0, 3));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    return (
        <Container >
            <div className='space-y-7 xl:space-y-8'>
                {/* Title */}
                <h1 className='text-center pb-0 md:text-2xl text-xl font-semibold capitalize tracking-wide'>
                    Enjoy Our Healthy And Fresh <br />
                    Grocery Items
                </h1>
                {/* Items Toggler */}
                <ItemsToggler
                    alignment={selectedCategory}
                    setAlignment={setSelectedCategory} />

                {/* Grocery Items */}
                <div className='grid md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5'>
                    {!isLoading ?
                        items.map(item => (
                            <ProductCard key={item.Id} product={item} />
                        ))
                        : Array.from({ length: 3 }).map((_, i) => {
                            return <ProductCardSkeleton key={i} />
                        })
                    }
                </div>
                <Button
                    onClick={() => navigate('/products')}
                    color='success'
                    size={isExtraSmallScreen ? 'small' : 'medium'}
                    variant='outlined'
                    sx={{ textTransform: 'capitalize', display: 'block', mx: 'auto' }}>
                    View All Products
                </Button>
            </div>
        </Container>
    );
};

// Grocery Items Toggler
const ItemsToggler = ({ alignment, setAlignment }) => {
    // MediaQuery
    const isExtraSmallScreen = useMediaQuery('(max-width: 640px)');
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');

    const categories = [
        { id: 0, name: 'Biscuits' },
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'DryFruits and Nuts' },
    ];

    return (
        <div className='space-x-3 md:space-x-5 text-center'>
            {categories.map(category => (
                <Button
                    sx={{ textTransform: 'capitalize', transition: 'all 150ms ease-in-out' }}
                    size={isExtraSmallScreen ? 'small' : isLargeScreen ? 'large' : 'medium'}
                    color='success'
                    variant={alignment === category.id ? 'contained' : 'text'}
                    key={category.id}
                    onClick={() => setAlignment(category.id)}
                    value={category.id}>
                    {category.name}
                </Button>
            ))}
        </div>
    );
};

export default EnjoyOurFreshGroceryItems;
