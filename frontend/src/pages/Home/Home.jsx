import React from "react";
import { Grid, LandingHero } from "../../components/imports";
import Candy from "../../assets/candy.jpeg";
import { useProductContext } from "../../hooks/useProductContext";
import { useBlogContext } from "../../hooks/useBlogContext";

function Home() {
  const { products } = useProductContext();

  const { blogs } = useBlogContext();
  return (
    <div className="home-wrapper">
      <div className="home">
        {/* Hero Component */}
        <LandingHero />
        {/* Latest Arrivals */}
        <div className="new-candy">
          <h2>Latest Arrivals </h2>
          <Grid card={true} products={products ? products.slice(0, 4) : null} />
        </div>
        {/* Featured Brands Section */}
        <div className="featured-brands">
          <h2>Featured Brands</h2>
          <Grid card={false} items={[Candy, Candy, Candy, Candy]} />
        </div>

        {/* Exclusive Offers */}
        <div className="sweet-deals">
          <h2>Exclusive Offers</h2>
          <Grid card={true} products={products ? products.slice(0, 4) : null} />
        </div>
        {/* Sweet Wholesale Deals */}
        <div className="bulk-candy">
          <h2>Sweet Wholesale Deals</h2>
          <Grid card={true} products={products ? products.slice(0, 4) : null} />
        </div>
        {/* Blogs */}
        <div className="blog-post">
          <h2>Blog Post</h2>
          <Grid
            card={false}
            blogs={blogs ? blogs.slice(0, 4) : null}
            visitBtn={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
