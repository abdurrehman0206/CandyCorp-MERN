import React, { useContext, useEffect, useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { Filter, ProductListGrid } from "../../components/imports";
import { filterContext } from "../../context/filterContext";

function Deals() {
  const { state } = useContext(filterContext);
  const { products } = useProductContext();
  const [sidebarFilterMenu, setSidebarFilterMenu] = useState(true);
  const [deals, setDeals] = useState(
    products?.filter((product) => product.onSale)
  );
  // console.log("...", state);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setSidebarFilterMenu(false);
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
      const filteredDeals = products?.filter((deal) => {
        if (deal.onSale) {
          if (
            state.size.includes(String(deal.size)) ||
            state.flavor.includes(String(deal.flavor)) ||
            state.type.includes(String(deal.type)) ||
            state.category.includes(String(deal.category))
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      setDeals(filteredDeals || deals);
    } else {
      setDeals(products?.filter((product) => product.onSale));
    }
  }, [state]);
  return (
    <div className="products-wrapper">
      <Filter
        products={deals}
        sidebarFilter={sidebarFilterMenu}
        setSidebarFilter={setSidebarFilterMenu}
      />

      <ProductListGrid
        products={deals}
        setSidebarFilter={setSidebarFilterMenu}
      />
    </div>
  );
}

export default Deals;
