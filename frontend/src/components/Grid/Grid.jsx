import React from "react";
import { ProductCard } from "../../components/imports";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useNavigate } from "react-router-dom";
function Grid({
  products = null,
  blogs = null,
  card = false,
  visitBtn = false,
  items = null,
  path = "",
  seeMore = true,
  className,
}) {
  console.log(products);
  const nav = useNavigate();
  return (
    <div className="grid-container">
      <section className="grid">
        {(card || visitBtn) && (
          <div className="btn-see-more">
            {seeMore && (
              <button
                className="btn-box-outline "
                onClick={() => nav(path.toString())}
              >
                {visitBtn ? "Visit" : "See More"} &nbsp; <FaArrowRightLong />
              </button>
            )}
          </div>
        )}
        <div className="grid-row">
          {/* Product cards */}
          <div className={`products-section ${className}`}>
            {card &&
              products?.map((product, i) => {
                return (
                  <div key={i}>
                    <ProductCard {...product} />
                  </div>
                );
              })}
          </div>

          {/*  blogs */}
          <div className="blogs-section">
            {!card &&
              blogs != null &&
              blogs?.map((blog, i) => {
                return <BlogCard {...blog} key={i} />;
              })}
          </div>

          {/* boxes */}
          <div className="box-section">
            {items?.map((item, i) => {
              return (
                <div className="grid-box" key={i}>
                  <img src={item} alt="feature-brand" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Grid;
