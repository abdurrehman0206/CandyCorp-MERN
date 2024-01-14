import React, { useContext, useEffect, useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { Filter, ProductListGrid } from "../../components/imports";
import { filterContext } from "../../context/filterContext";
import Spinner from "../../components/Common/Spinner";
function Products() {
  const [sidebarFilter, setSidebarFilter] = useState(false);
  const { products } = useProductContext();
  const [allproducts, setAllProducts] = useState(products);
  const { state } = useContext(filterContext);

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
  // Filtering products
  useEffect(() => {
    if (
      state.size.length > 0 ||
      state.type.length > 0 ||
      state.flavor.length > 0 ||
      state.category.length > 0
    ) {
      const filteredProducts = products?.filter((product) => {
        if (
          state.size.includes(String(product.size)) ||
          state.flavor.includes(String(product.flavor)) ||
          state.type.includes(String(product.type)) ||
          state.category.includes(String(product.category))
        ) {
          return true;
        } else {
          return false;
        }
      });

      setAllProducts(filteredProducts || products);
    } else {
      setAllProducts(products);
    }
  }, [state, products]);
  if (!products || !allproducts) {
    return <Spinner />;
  }
  return (
    <div className="products-wrapper">
      <Filter
        products={allproducts}
        sidebarFilter={sidebarFilter}
        setSidebarFilter={setSidebarFilter}
        // setFilterSelectionList={setFilterSelectionList}
      />

      <ProductListGrid
        sidebarFilter={sidebarFilter}
        products={allproducts}
        setSidebarFilter={setSidebarFilter}
      />
    </div>
  );
}

export default Products;
