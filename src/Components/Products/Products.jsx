import { Container, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard, { ProductCardSkeleton } from "./ProductCard/ProductCard";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Products = ({ categoryProducts }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();
  const location = useLocation();

  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "https://desismart.co.uk/web/product/get-all-product",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Fetched products:", response.data.data);
        const products = response.data.data;
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
    const searchTerm = params.get("search") || "";

    if (searchTerm) {
      const filtered = allProducts.filter((product) =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [location.search, allProducts]);

  return (
    <main className="min-h-screen space-y-5 pt-20 mb-9">
      <Fade in={true}>
        <Container className="xl:space-y-10 sm:space-y-8 space-y-6">
          {/* Title */}
          <h1 className="pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize">
            {categoryName ? categoryName : "All Products"}
          </h1>

          {/* Product Cards */}
          <section className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5">
            {!isLoading
              ? filteredProducts.map((product) => (
                  <ProductCard key={product.Id} product={product} />
                ))
              : Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
          </section>
        </Container>
      </Fade>
    </main>
  );
};

export default Products;
