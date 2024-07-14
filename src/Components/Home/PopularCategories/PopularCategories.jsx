import { Button, Container, useMediaQuery } from '@mui/material';
import { ArrowForward } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import list from "../../../assets/list.gif"
import "swiper/css";
import 'swiper/css/navigation';
import CategoryCard from '../../CategoryCard/CategoryCard';
import { useRef, useEffect, useState } from 'react';
import './swiper.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Category images

const PopularCategories = () => {
    // Media Query
    const isExtraSmallScreen = useMediaQuery('(max-width: 664px)');
    const navigate = useNavigate();

    return (
        <Container>
            <section className='space-y-7'>
                <header className='flex justify-between items-center'>
                    {/* Title */}
                    <h1 className='pb-0 md:text-2xl text-xl font-semibold capitalize'>
                        Top Categories
                    </h1>
                    {/* See all Categories Btn */}
                    <Button
                        size={isExtraSmallScreen ? 'small' : 'medium'}
                        color='success'
                        variant='outlined'
                        onClick={() => navigate('/categories')}
                        sx={{ textTransform: 'capitalize' }} endIcon={
                            <ArrowForward fontSize='large' />}>
                        See All
                    </Button>
                </header>

                {/* Categories */}
                <Categories />
            </section>
        </Container>
    );
};

// Categories Carousel
const Categories = ({category}) => {
    const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/categories`);
  };
    const swiperRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const eposKey = "4IUQP4AY3GCQHEKN8TFUECT5AE16FK91";
    // const eposSecret = "HWQWEWZSXXBO6GHAN2HSPELYCUSZJBSZ";
    // const authToken = "NElVUVA0QVkzR0NRSEVLTjhURlVFQ1Q1QUUxNkZLOTE6SFdRV0VXWlNYWEJPNkdIQU4ySFNQRUxZQ1VTWkpCU1o=";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken')
                const response = await axios.get(
                    `https://desismart.co.uk/web/categories/get-all-categories`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                            // "epos-api-key": eposKey,
                            // "epos-api-secret": eposSecret,
                        },
                    }
                );
                // console.log(response.data.data)
                setCategories(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Media Query
    const isExtraSmallScreen = useMediaQuery('(max-width: 640px)');

    

    return (
        <Swiper
            breakpoints={{
                // Extra_Small Screen
                0: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // Medium Screen
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                // Large Screen
                1060: {
                    slidesPerView: 4,
                    spaceBetween: 25
                }
            }}
            modules={[Pagination, Navigation, FreeMode]}
            navigation={!isExtraSmallScreen}
            freeMode={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="mySwiper"
        >
            {
                !isLoading ? (
                    categories.map(category => (
                        <SwiperSlide key={category.Id}>
                            <Card onClick={handleCardClick} style={{ cursor: 'pointer',borderRadius:'12px' }} className='hover:bg-[#979595] hover:transition-all'>
      
      <CardContent className='bg-[#ffffff] hover:bg-[#8f4144]'>
      <img src={list} className='w-20 m-auto' alt="" />
        <Typography gutterBottom component="div">
          <div className='p-7 items-center text-black hover:text-white text-center text-xl' style={{fontWeight:'600'}}>{category.Name}</div>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category.Description}
        </Typography>
      </CardContent>
    </Card>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )
            }
        </Swiper>
    )
};

export default PopularCategories;
