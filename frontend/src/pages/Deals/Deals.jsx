import React, { useEffect, useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { Filter, ProductListGrid } from "../../components/imports";

function Deals() {
  const [sidebarFilterMenu, setSidebarFilterMenu] = useState(true);
  const { products } = useProductContext();
  let deals = products?.filter((product) => product?.onSale);

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
