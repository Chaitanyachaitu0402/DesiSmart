import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import list from "../../assets/list.gif"

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/categories/${category.Id}/eachcategoryproduct`);
  };

  return (
    <Card onClick={handleCardClick} style={{ cursor: 'pointer',borderRadius:'12px',boxShadow: '0 9px 5px -0px rgb(0 0 0 / 0.4)' }} className=' '>
      
      <CardContent className='bg-[#ffffff] hover:bg-[#2e7d32] hover:transition-all'>
      <img src={list} className='w-20 m-auto' alt="" />
        <Typography gutterBottom component="div">
          <div className='p-7 items-center text-black hover:text-white text-center text-xl' style={{fontWeight:'600'}}>{category.Name}</div>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category.Description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const CategoryCardSkeleton = () => (
  <Card>
    <Skeleton variant="rectangular" width="100%" height={140} />
    <CardContent>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </CardContent>
  </Card>
);

export default CategoryCard;
