import React, { useEffect, useState } from "react";
import { BundleCard } from "../../components/imports";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoFilterSharp } from "react-icons/io5";
import Spinner from "../Common/Spinner";

function BundleListGrid({ bundles, setSidebarFilter }) {
  const [items, setItems] = useState({
    items: [],
  });

  const [sortSelection, setSortSelection] = useState("asc");
  const bundlesPerPage = 12;

  useEffect(() => {
    bundles = sortBundles(bundles, sortSelection);
    setItems({ items: bundles?.slice(0, bundlesPerPage) });
  }, [bundles, sortSelection]);

  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = items.items?.length;
      const nextBundles = sortBundles(bundles, sortSelection);
      setItems((prev) => ({
        items: [
          ...prev.items,
          ...nextBundles.slice(currentLength, currentLength + bundlesPerPage),
        ],
      }));
    }, 2500);
  };

  const sortBundles = (bundles, sortOption) => {
    switch (sortOption) {
      case "asc":
        return bundles?.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "desc":
        return bundles?.slice().sort((a, b) => b.name.localeCompare(a.name));
      case "LTH":
        return bundles?.slice().sort((a, b) => a.price - b.price);
      case "HTL":
        return bundles?.slice().sort((a, b) => b.price - a.price);
      case "OTN":
        return bundles
          ?.slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "NTO":
        return bundles
          ?.slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return bundles;
    }
  };

  return (
    <div className="bundle-grid-wrapper">
      <section className="bundles">
        <div className="bundles-grid">
          <div className="bundles-header">
            <div className="bundles-header-top">
              <div className="total-bundles">{bundles?.length} Bundles</div>
              <div
                className="filter-btn"
                onClick={() => {
                  document.body.classList.add("no-scroll");
                  setSidebarFilter(true);
                }}
              >
                <IoFilterSharp />
              </div>
            </div>

            <div className="sort-by">
              <label htmlFor="bundles-sort">Sort By : </label>
              <select
                id="bundles-sort"
                name="bundles"
                onChange={(e) => {
                  setSortSelection(e.target.value);
                }}
              >
                <option value="asc">In alphabetical order (A-Z)</option>
                <option value="desc">
                  In reverse alphabetical order (Z-A)
                </option>
                <option value="LTH">Lowest to highest price</option>
                <option value="HTL">Highest to Lowest price</option>
                <option value="OTN">Oldest to newest date</option>
                <option value="NTO">Newest to oldest date</option>
              </select>
            </div>
          </div>
          <InfiniteScroll
            dataLength={items.items ? items.items?.length : 0}
            next={fetchMoreData}
            hasMore={true}
            className="bundles-grid-scroll"
          >
            {items.items?.map((bundle, index) => (
              <BundleCard {...bundle} key={index} />
            ))}
          </InfiniteScroll>
          {items.items?.length < bundles?.length && <Spinner />}
        </div>
      </section>
    </div>
  );
}

export default BundleListGrid;
