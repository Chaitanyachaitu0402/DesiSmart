import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Fade } from '@mui/material';
import CategoryCard, { CategoryCardSkeleton } from "../CategoryCard/CategoryCard";
import { useParams } from 'react-router-dom';
import PopularCategories from "../Home/PopularCategories/PopularCategories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [popularcategories, setpopularCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();

  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  // Credentials
  const eposKey = "4IUQP4AY3GCQHEKN8TFUECT5AE16FK91";
  const eposSecret = "HWQWEWZSXXBO6GHAN2HSPELYCUSZJBSZ";
  const authToken = "NElVUVA0QVkzR0NRSEVLTjhURlVFQ1Q1QUUxNkZLOTE6SFdRV0VXWlNYWEJPNkdIQU4ySFNQRUxZQ1VTWkpCU1o=";

  // Fetch Categories from Eposnow API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/https://api.eposnowhq.com/api/v4/Category",
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
        const categories = response.data;
        setCategories(categories);
        setpopularCategories(popularcategories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className='min-h-screen space-y-5 pt-20 mb-9'>
      <Fade in={true}>
        <Container className='xl:space-y-10 sm:space-y-8 space-y-6'>
          {/* Title */}
          <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
            {categoryName ? categoryName : 'All Categories'}
          </h1>

          {/* Category Cards */}
          <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5'>
            {!isLoading ? (
              categories.map((category) => (
                <CategoryCard key={category.Id} category={category} />
              ))
            ) : (
              Array.from({ length: 8 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))
            )}
          </section>
        </Container>
      </Fade>
    </main>
  );
};

export default Categories;
