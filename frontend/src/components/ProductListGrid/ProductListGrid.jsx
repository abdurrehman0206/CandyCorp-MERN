import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components/imports";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoFilterSharp } from "react-icons/io5";
import Spinner from "../Common/Spinner";
function ProductListGrid({ products, setSidebarFilter }) {
  const [items, setItems] = useState({
    items: [],
  });
  // const [loader, setLoader] = useState(false);
  const [sortSelection, setSortSelection] = useState("asc");
  const productsPerPage = 12;
  useEffect(() => {
    products = sortProducts(products, sortSelection);
    setItems({ items: products.slice(0, productsPerPage) });
  }, [products, sortSelection]);
  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = items.items.length;
      const nextProducts = sortProducts(products, sortSelection);
      setItems((prev) => ({
        items: [
          ...prev.items,
          ...nextProducts.slice(currentLength, currentLength + productsPerPage),
        ],
      }));
    }, 2500);
  };
  const sortProducts = (products, sortOption) => {
    switch (sortOption) {
      case "asc":
        return products.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "desc":
        return products.slice().sort((a, b) => b.name.localeCompare(a.name));
      case "LTH":
        return products.slice().sort((a, b) => a.price - b.price);
      case "HTL":
        return products.slice().sort((a, b) => b.price - a.price);
      case "OTN":
        return products
          .slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "NTO":
        return products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return products;
    }
  };
  return (
    <div className="product-grid-wrapper">
      {/* infinite scrolling products */}
      <section className="products">
        <div className="products-grid">
          <div className="products-header">
            <div className="products-header-top">
              <div className="total-products">{products.length} Products</div>
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
              <label htmlFor="products-sort">Sort By : </label>
              <select
                id="products-sort"
                name="products"
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
            dataLength={items.items ? items.items.length : 0}
            next={fetchMoreData}
            hasMore={true}
            className="products-grid-scroll"
          >
            {items.items?.map((product, index) => (
              <ProductCard {...product} key={index} />
            ))}
          </InfiniteScroll>
          {items.items.length < products.length && <Spinner />}
        </div>
      </section>
    </div>
  );
}

export default ProductListGrid;
