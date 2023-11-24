import React from "react";
import { useProductContext } from "../../hooks/useProductContext";
function Products() {
  const { products } = useProductContext();

  if (!products) {
    return;
  }
  return (
    <div className="products-wrapper">
      <div className="products">
        {products.map((product) => {
          <div className="">{product.title}</div>;
        })}
      </div>
    </div>
  );
}

export default Products;
