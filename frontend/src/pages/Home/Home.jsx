import React from "react";
import { Grid, LandingHero } from "../../components/imports";
import { useProductContext } from "../../hooks/useProductContext";
import { useBlogContext } from "../../hooks/useBlogContext";
import { useBundleContext } from "../../hooks/useBundleContext";

function Home() {
  const { products } = useProductContext();
  const { blogs } = useBlogContext();
  const { bundles } = useBundleContext();
  // console.log(products);
  return (
    <div className="home-wrapper">
      <div className="home">
        {/* Hero Component */}
        <LandingHero />
        {/* Latest Arrivals */}
        <div className="new-candy">
          <h2>Latest Arrivals </h2>
          <Grid
            card={true}
            products={
              products
                ? products
                    ?.slice()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .slice(0, 4)
                : null
            }
            path="/products"
          />
        </div>

        {/* Exclusive Offers */}
        <div className="sweet-deals">
          <h2>Exclusive Offers</h2>
          <Grid
            card={true}
            products={
              products
                ? products
                    ?.filter((product) => product?.onSale && product?.price < 6)
                    .slice(0, 4)
                : null
            }
            path="/deals"
          />
        </div>
        {/* Bundles Offers */}
        <div className="sweet-deals">
          <h2>Exclusive Bundles Deals</h2>
          <Grid
            card={true}
            products={
              bundles
                ? bundles
                    ?.filter((bundle) => bundle?.onSale && bundle?.price < 50)
                    .slice(0, 4)
                : null
            }
            path="/bundles-deals"
          />
        </div>
        {/* Blogs */}
        <div className="blog-post">
          <h2>Blog Post</h2>
          <Grid
            card={false}
            blogs={
              blogs ? blogs?.sort(() => Math.random() - 0.5)?.slice(0, 4) : null
            }
            visitBtn={true}
            path="/blogs"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
