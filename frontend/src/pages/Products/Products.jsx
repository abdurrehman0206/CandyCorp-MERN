import React, { useEffect, useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { Filter, ProductListGrid } from "../../components/imports";
function Products() {
  const [sidebarFilter, setSidebarFilter] = useState(true);
  const { products } = useProductContext();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setSidebarFilter(false);
        document.body.classList.remove("no-scroll");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (!products) {
    return;
  }
  return (
    <div className="products-wrapper">
      <Filter
        sidebarFilter={sidebarFilter}
        setSidebarFilter={setSidebarFilter}
      />
      <ProductListGrid
        products={products}
        setSidebarFilter={setSidebarFilter}
      />
    </div>
  );
}

export default Products;
