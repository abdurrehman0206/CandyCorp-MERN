import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components/imports";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoFilterSharp } from "react-icons/io5";
import Spinner from "../Common/Spinner";
function ProductListGrid({ products, setSidebarFilter }) {
  const [state, setState] = useState({
    items: [],
  });
  const [loader, setLoader] = useState(false);
  const productsPerPage = 12;
  useEffect(() => {
    const initialProducts = products;
    setState({ items: initialProducts.slice(0, productsPerPage) });
  }, []);
  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = state.items.length;
      const nextProducts = products;
      setState((prev) => ({
        items: [
          ...prev.items,
          ...nextProducts.slice(currentLength, currentLength + productsPerPage),
        ],
      }));
    }, 2500);
  };
  return (
    <div className="product-grid-wrapper">
      {/* infinite scrolling products */}
      <section className="products">
        <div className="products-grid">
          <div className="products-header">
            <div className="products-header-top">
              <div className="total-products">{products.length} items</div>
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
              <select id="products-sort" name="products">
                <option value="Featured">Featured</option>
                <option value="TopRated">Top-Rated</option>
                <option value="Ascending">In alphabetical order (A-Z)</option>
                <option value="Descending">
                  In reverse alphabetical order (Z-A)
                </option>
                <option value="low to high">Lowest to highest price</option>
                <option value="low to high">Highest to Lowest price</option>
                <option value="old to new date">Oldest to newest date</option>
                <option value="new to old date">Newest to oldest date</option>
              </select>
            </div>
          </div>
          <InfiniteScroll
            dataLength={state.items ? state.items.length : 0}
            next={fetchMoreData}
            hasMore={true}
            className="products-grid-scroll"
          >
            {state.items?.map((product, index) => (
              <ProductCard {...product} key={index} />
            ))}
          </InfiniteScroll>
          {state.items.length < products.length && <Spinner />}
        </div>
      </section>
    </div>
  );
}

export default ProductListGrid;
