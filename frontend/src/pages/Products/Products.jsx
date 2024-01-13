import React, { useEffect, useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductCard } from "../../components/imports";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
function Products() {
  const { products } = useProductContext();
  const [state, setState] = useState({
    items: products ? [...products] : [],
  });
  const [sidebarFilter, setSidebarFilter] = useState(false);
  //colors selection
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const [filterMenu, setFilterMenu] = useState([
    {
      name: "Top Rated",
      options: [
        "Novelty",
        "Retro",
        "Gum",
        "Sour",
        "Gummy",
        "Hard Candy",
        "Lollipops",
        "Drinks",
        "New Candy",
        "Other",
      ],
      open: false,
      showMore: false,
    },
    {
      name: "Size",
      options: [
        "Giant",
        "Fun Size",
        "Movie Theatre Box",
        "Squeeze Tube",
        "Share Bag",
        "King Size",
        "Bulk Bag",
        "Pantry Size",
        "Peg Bag",
        "Others",
      ],
      open: false,
      showMore: false,
    },
    {
      name: "Product Type",
      options: [
        "Bulk",
        "Candy",
        "Candy Funhouse",
        "Chocolate",
        "Collectibles",
        "Snacks",
      ],
      open: false,
      showMore: false,
    },
    {
      name: "Variety",
      options: [
        "Milk Chocolate",
        "Dark Chocolate",
        "White Chocolate",
        "Cotton Candy",
        "Gummy",
        "Jelly Beans",
        "Licorice",
        "Lollipops",
        "Marshmallows",
        "Nougat",
        "Popping",
        "Taffy",
        "Toffee",
        "Drink Mix",
        "Drink",
        "Spread",
        "Chips",
        "Cereal",
        "Cookie",
        "Baked Goods",
        "Seeds",
        "Nuts",
        "Condiment",
        "Gum",
        "Mints",
        "Powder Candy",
        "Chocolate Covered",
        "Hard Candy",
        "Fudge",
        "Scented Candle",
        "Baking Ingredients",
        "Spray",
        "Popcorn",
        "Liquid-Filled",
        "Syrup",
        "Other",
      ],
      open: true,
      showMore: false,
    },
    {
      name: "Flavour",
      options: [
        "Sour",
        "Spicy",
        "Banana",
        "Blue Raspberry",
        "Caramel",
        "Cherry",
        "Cinnamon",
        "Coconut",
        "Coffee",
        "Fruit Punch",
        "Grape",
        "Mint",
        "Orange",
        "Peach",
        "Peanut",
        "Peanut Butter",
        "Peppermint",
        "Pineapple",
        "Strawberry",
        "Vanilla",
        "Watermelon",
        "Unique",
        "Tropical",
        "Assorted",
        "Cotton Candy",
        "Lemon",
        "Lime",
        "Cola",
        "Mango",
        "Berry",
        "Chocolate",
        "Bubble Gum",
        "BBQ",
        "Fruity",
        "Ranch",
        "Dill Pickle",
        "Blueberry",
        "Chili",
        "Green Apple",
        "Apple",
        "Cookies n Cream",
        "Marshmallow",
        "Pink Lemonade",
        "Raspberry",
        "Black Currant",
        "Hazelnut",
        "Honey",
        "Cheese",
        "Other",
      ],
      open: false,
      showMore: false,
    },
  ]);
  const [colorMenu, setColorMenu] = useState({
    name: "Colors",
    colors: [
      "#3B3486",
      "#D63484",
      "#7E2553",
      "#FF004D",
      "#33186B",
      "#392467",
      "#00A8E8",
      "#006C7F",
      "#F6AE2D",
      "#8E5572",
      "#00A676",
    ],
    open: false,
  });
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
    if (products) {
      setState((prevState) => ({
        ...prevState,
        items: [...prevState.items, ...products],
      }));
    }
  }, [products]);
  if (!products) {
    return;
  }
  const fetchMoreData = () => {
    setTimeout(() => {
      setState((prev) => ({
        items: [...prev.items, ...products],
      }));
    }, 1500);
  };

  // show options handler
  const showOptionsHandler = (m) => {
    setFilterMenu((prevFilterMenu) =>
      prevFilterMenu.map((filter) =>
        filter.name === m.name ? { ...filter, open: !filter.open } : filter
      )
    );
  };

  //handle more options
  const showMoreOptionsHandler = (m) => {
    setFilterMenu((prevFilterMenu) =>
      prevFilterMenu.map((filter) =>
        filter.name === m.name
          ? { ...filter, showMore: !filter.showMore }
          : filter
      )
    );
    console.log(m.showMore);
  };

  return (
    <div className="products-wrapper">
      {/* filter sidebar */}
      <section
        className={`filter-container`}
        style={
          sidebarFilter
            ? {
                display: "block",
                position: "absolute",
                top: "0%",
                right: "0%",
                margin: "0",
                zIndex: "1000",
                width: "300px",
                height: "100vh",
                // position: "fixed",
                overflow: "auto",
              }
            : null
        }
      >
        {sidebarFilter && (
          <button
            className="sidebarfilter-close-btn"
            onClick={() => {
              

              document.body.classList.remove("no-scroll");
              setSidebarFilter(false);
            }}
          >
            <AiOutlineClose />
          </button>
        )}
        {filterMenu?.map((m, i) => {
          return (
            <div className="filter" key={i}>
              <div
                className="filter-label"
                onClick={() => showOptionsHandler(m)}
                name={m.name}
              >
                <span className="filter-label-name">{m.name}</span>
                <button className="show-options-btn" name={m.name}>
                  {!m.open ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </button>
              </div>
              {m.open && (
                <ul className="filter-options-list">
                  {m.options?.map((option, j) => {
                    return (
                      <li
                        className={
                          j >= 9 && !m.showMore
                            ? "hide-filter-option"
                            : "filter-option"
                        }
                        key={j}
                      >
                        <input
                          className="filter-option-input"
                          type="checkbox"
                          id={`filter-${option}`}
                        />
                        <label
                          className="filter-option-label"
                          htmlFor={`filter-${option}`}
                        >
                          {option}
                        </label>
                        <small className="filter-option-quantity">10</small>
                      </li>
                    );
                  })}

                  <button
                    className={`see-more-options-btn ${
                      m.options.length > 10 ? "" : "hide-filter-option"
                    }`}
                    onClick={() => showMoreOptionsHandler(m)}
                    name={m.name}
                  >
                    show {m.showMore ? "less - " : "more + "}
                  </button>
                </ul>
              )}
              <hr />
            </div>
          );
        })}

        {/* Colors Filter  */}

        <div className="colors-filter">
          {/* <span className="filter-label-name">Colors</span> */}

          <div
            className="color-label"
            onClick={() => {
              setColorMenu((prev) => {
                return { ...prev, open: !prev.open };
              });
            }}
            name={colorMenu.name}
          >
            <span className="color-label-name">Colors </span>
            <button className="show-options-btn">
              {!colorMenu.open ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
          </div>
          {colorMenu.open && (
            <ul className="colors">
              {colorMenu.colors?.map((color, i) => {
                return (
                  <div key={i} className="color-container">
                    <label className="color-label">
                      <input
                        type="radio"
                        className="color-input"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => handleColorChange(color)}
                        style={{
                          backgroundColor: color,
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
        <hr />
      </section>

      {/* infinite scrolling products */}
      <section className="products">
        <div className="products-grid">
          <div className="products-header">
            <div className="products-header-top">
              <div className="total-products">500 Products</div>
              <div
                className="filter-btn"
                onClick={() => {
                  document.body.classList.add("no-scroll");
                  // document.body.classList.remove("no-scroll");
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
            loader={<h4>Loading...</h4>}
            // scrollThreshold="200px"
            className="products-grid-scroll"
          >
            {state.items?.map((product, index) => (
              <ProductCard {...product} key={index} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}

export default Products;
