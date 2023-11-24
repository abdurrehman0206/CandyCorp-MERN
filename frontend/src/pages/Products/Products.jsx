import React from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductCard } from "../../components/imports";
function Products() {
  const { products } = useProductContext();

  if (!products) {
    return;
  }
  return (
    <div className="products-wrapper">
      <div className="products">
        <div className="products-grid">
          {products.map((product, i) => {
            return <ProductCard {...product} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
