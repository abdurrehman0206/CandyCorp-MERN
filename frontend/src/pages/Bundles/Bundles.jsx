import React, { useEffect, useState } from "react";
import { useBundleContext } from "../../hooks/useBundleContext";
import { Filter, BundleListGrid } from "../../components/imports";

function Bundles() {
  const [sidebarFilter, setSidebarFilter] = useState(true);
  const { bundles } = useBundleContext();

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

  if (!bundles) {
    return null; // or some loading state if needed
  }

  return (
    <div className="bundles-wrapper">
      <Filter
        products={bundles}
        sidebarFilter={sidebarFilter}
        setSidebarFilter={setSidebarFilter}
      />
      <BundleListGrid bundles={bundles} setSidebarFilter={setSidebarFilter} />
    </div>
  );
}

export default Bundles;
