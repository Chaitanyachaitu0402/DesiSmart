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

    const categoryIds = {
        Biscuits: 1,
        Breakfast: 2,
        "DryFruits and Nuts": 3
    };

    // Fetch products based on selected category
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const accessToken = localStorage.getItem('accessToken');
                console.log("=========>", accessToken);
                const categoryName = Object.keys(categoryIds)[selectedCategory];
                const categoryId = categoryIds[categoryName];

                const response = await axios.get(
                    `https://desismart.co.uk/web/product/get-all-product`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("API Response: ", response);

                if (response.data && response.data.data) {
                    setItems(response.data.data.slice(0, 3));
                } else {
                    console.error("Invalid API response structure: ", response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    return (
        <Container>
            <div className='space-y-7 xl:space-y-8'>
                <h1 className='text-center pb-0 md:text-2xl text-xl font-semibold capitalize tracking-wide'>
                    Enjoy Our Healthy And Fresh <br />
                    Grocery Items
                </h1>
                <ItemsToggler
                    alignment={selectedCategory}
                    setAlignment={setSelectedCategory} />
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

const ItemsToggler = ({ alignment, setAlignment }) => {
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
