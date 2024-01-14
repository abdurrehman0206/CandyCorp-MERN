import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { filterContext } from "../../context/filterContext";

function Filter({ products = null, sidebarFilter, setSidebarFilter }) {
  const { state, dispatch } = useContext(filterContext);
  // const [selectedColor, setSelectedColor] = useState(null);/
  // const handleColorChange = (color) => {
  //   setSelectedColor(color);
  // };

  const countProductsByProperty = (property) => {
    const uniqueValues = [
      ...new Set(products?.map((product) => product[property])),
    ];

    const counts = uniqueValues.map((value) => ({
      propertyName: value,
      countOfPropertyName: products.filter(
        (product) => product[property] === value
      ).length,
    }));

    return counts;
  };

  const [filterMenu, setFilterMenu] = useState([
    {
      name: "Size",
      options: [...countProductsByProperty("size")],
      open: true,
      showMore: false,
    },
    {
      name: "Type",
      options: [...countProductsByProperty("type")],
      open: true,
      showMore: false,
    },
    {
      name: "Flavor",
      options: [...countProductsByProperty("flavor")],
      open: true,
      showMore: false,
    },
    {
      name: "Category",
      options: [...countProductsByProperty("category")],
      open: true,
      showMore: false,
    },
  ]);
  // const [colorMenu, setColorMenu] = useState({
  //   name: "Colors",
  //   colors: [
  //     "#3B3486",
  //     "#D63484",
  //     "#7E2553",
  //     "#FF004D",
  //     "#33186B",
  //     "#392467",
  //     "#00A8E8",
  //     "#006C7F",
  //     "#F6AE2D",
  //     "#8E5572",
  //     "#00A676",
  //   ],
  //   open: false,
  // });

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
  };

  const selectionHandler = (e) => {
    if (e.target.checked) {
      dispatch({ type: e.target.name, payload: e.target.value });
    } else {
      dispatch({ type: "Del_" + e.target.name, payload: e.target.value });
    }
  };

  useEffect(() => {
    Object.keys(state).forEach((key) => {
      if (state[key].length > 0) {
        setFilterMenu((prevFilterMenu) =>
          prevFilterMenu.map((filter) =>
            filter.name === key.charAt(0).toUpperCase() + key.slice(1)
              ? { ...filter, open: true }
              : filter
          )
        );
      }
      for (const v of state[key]) {
        key = key.charAt(0).toUpperCase() + key.slice(1);
        const radio = document.querySelector(
          `input[name="${key}"][value="${v}"]`
        );
        if (radio) {
          radio.checked = true;
        }
      }
    });
  }, []);
  return (
    <div
      className="filter-wrapper"
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
              padding: "0",
              overflow: "auto",
            }
          : null
      }
    >
      {/* filter sidebar */}
      <section className={`filter-container`}>
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
                          id={`filter-${option.propertyName + m.name}`}
                          onClick={selectionHandler}
                          value={option.propertyName}
                          name={m.name}
                        />
                        <label
                          className="filter-option-label"
                          htmlFor={`filter-${option.propertyName + m.name}`}
                        >
                          {option.propertyName}
                        </label>
                        <small className="filter-option-quantity">
                          {option.countOfPropertyName}
                        </small>
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
        {/* <div className="colors-filter"> */}
        {/* <span className="filter-label-name">Colors</span> */}

        {/* <div
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
          )} */}
        {/* </div> */}
        {/* <hr />  */}
      </section>
    </div>
  );
}

export default Filter;
