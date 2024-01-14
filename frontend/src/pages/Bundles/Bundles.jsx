import React, { useContext, useEffect, useState } from "react";
import { useBundleContext } from "../../hooks/useBundleContext";
import { Filter, BundleListGrid } from "../../components/imports";
import { filterContext } from "../../context/filterContext";

function Bundles() {
  const [sidebarFilter, setSidebarFilter] = useState(true);
  const { bundles } = useBundleContext();
  const [allBundles, setAllBundles] = useState(bundles);
  const { state } = useContext(filterContext);

  // console.log(bundles);
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

  useEffect(() => {
    if (
      state.size.length > 0 ||
      state.type.length > 0 ||
      state.flavor.length > 0 ||
      state.category.length > 0
    ) {
      const filteredBundles = bundles?.filter((bundle) => {
        if (
          state.size.includes(String(bundle.size)) ||
          state.flavor.includes(String(bundle.flavor)) ||
          state.type.includes(String(bundle.type)) ||
          state.category.includes(String(bundle.category))
        ) {
          return true;
        } else {
          return false;
        }
      });

      setAllBundles(filteredBundles || bundles);
    } else {
      setAllBundles(bundles);
    }
  }, [state]);
  if (!bundles) {
    return null; // or some loading state if needed
  }

  return (
    <div className="bundles-wrapper">
      <Filter
        products={allBundles}
        sidebarFilter={sidebarFilter}
        setSidebarFilter={setSidebarFilter}
      />
      <BundleListGrid
        bundles={allBundles}
        setSidebarFilter={setSidebarFilter}
      />
    </div>
  );
}

export default Bundles;
