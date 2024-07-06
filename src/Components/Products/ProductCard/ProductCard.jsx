import { Button, Card, CardActions, CardContent, Fade, IconButton, TextField, Skeleton } from '@mui/material';
import { useContext, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import SuccessAlert from '../../SuccessAlert/SuccessAlert';
import { handleSessionStorage } from '../../../utils/utils';
import { groceryContext } from '../../Layout/Layout';

const ProductCard = ({ product }) => {
    const { Name, SalePrice, Supplier } = product;

    // State for success alert
    const [openAlert, setOpenAlert] = useState(false);

    // State for product quantity
    const [quantity, setQuantity] = useState(1);

    // Context for cart items
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;

    // Handle Add To Cart
    const handleAddToCartBtn = () => {
        const existingProduct = cartItems.find(item => item.id === product.Id);

        const targetedProduct = {
            id: product.Id,
            name: Name,
            price: SalePrice,
            quantity: existingProduct ? existingProduct.quantity + quantity : quantity,
            total: ((existingProduct ? existingProduct.quantity + quantity : quantity) * SalePrice).toFixed(2),
        };

        const updatedCartItems = existingProduct
            ? cartItems.map(item => item.id === product.Id ? targetedProduct : item)
            : [...cartItems, targetedProduct];

        setCartItems(updatedCartItems);
        handleSessionStorage('set', 'cartItems', updatedCartItems);

        setOpenAlert(true);
    };

    // Handle quantity change
    const handleQuantityChange = (amount) => {
        if (quantity + amount > 0) {
            setQuantity(quantity + amount);
        }
    };

    return (
        <div>
            <SuccessAlert state={[openAlert, setOpenAlert]} message={'Item added successfully'} />

            <Fade in={true}>
                <Card sx={{ maxWidth: 295, mx: 'auto', boxShadow: '0 9px 5px -0px rgb(0 0 0 / 0.4)' }} >
                    <div className='p-1.5'>
                        <CardContent className='md:space-y-2 space-y-1.5 '>
                            {/* Product name */}
                            <h3 className='md:text-xl lg:text-xl text-xl text-gray-700 font-semibold text-center capitalize'>
                                {Name}
                            </h3>
                            {/* Product details */}
                            <div className='flex justify-center space-x-5'>
                                <span className='block text-sm md:text-xs lg:text-lg font-bold'>
                                    £ {SalePrice} GBP
                                </span>
                            </div>
                            {/* Supplier details */}
                            <div className='flex justify-center'>
                                <span className='text-sm md:text-xs lg:text-sm text-black font-medium'>
                                    <span className='font-bold text-black underline'>Supplier:</span> {Supplier?.Name || 'Unknown'}
                                </span>
                            </div>
                            {/* Quantity selector */}
                            <div className='flex justify-center items-center space-x-2'>
                                <IconButton onClick={() => handleQuantityChange(-1)} size='small'>
                                    <Remove />
                                </IconButton>
                                <TextField
                                    value={quantity}
                                    variant='outlined'
                                    size='small'
                                    sx={{ width: '50px', textAlign: 'center' }}
                                    inputProps={{ readOnly: true }}
                                />
                                <IconButton onClick={() => handleQuantityChange(1)} size='small'>
                                    <Add />
                                </IconButton>
                            </div>
                        </CardContent>
                        {/* Actions */}
                        <CardActions>
                            <Button
                                sx={{
                                    textTransform: 'capitalize',
                                    marginX: 'auto',
                                    ':hover': {
                                        bgcolor: '#2e7d32',
                                        color: 'white',
                                        transition: 'all 235ms ease-in-out',
                                    },
                                }}
                                fullWidth
                                onClick={handleAddToCartBtn}
                                size='medium'
                                variant='outlined'
                                color='success'
                            >
                                Add to cart
                            </Button>
                        </CardActions>
                    </div>
                </Card>
            </Fade>
        </div>
    );
};

// ProductCard Skeleton
export const ProductCardSkeleton = () => (
    <div>
        <Card sx={{ maxWidth: 308, mx: 'auto', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', backgroundColor: 'white' }}>
            <Skeleton variant='rectangular' height={170} width={'100%'} />
            <div className='px-1.5 pb-2'>
                <CardContent className='space-y-2' sx={{ pb: 1 }}>
                    <Skeleton sx={{ mx: 'auto' }} variant='text' height={'3rem'} width={'55%'} />
                    <div className='md:space-y-1.5 space-y-2 lg:space-y-2'>
                        <div className='flex justify-center space-x-5'>
                            <Skeleton variant='text' height={'1.3rem'} width={'30%'} />
                            <Skeleton variant='text' height={'1.3rem'} width={'25%'} />
                        </div>
                        <div className='flex justify-center'>
                            <Skeleton variant='text' height={'1.6rem'} width={'80%'} />
                        </div>
                    </div>
                </CardContent>
                <CardActions sx={{ pt: 0 }}>
                    <Skeleton variant='rounded' height={'1.9rem'} width={'100%'} />
                </CardActions>
            </div>
        </Card>
    </div>
);

export default ProductCard;
