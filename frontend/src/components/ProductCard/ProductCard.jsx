import React from "react";

function ProductCard() {
  return (
    <div className="product-card-container">
      <div className="product-card">
        <div className="product-card-header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBq0VK0U_vL56TP_oq1HupZDbiTBlnKZxfXdig0YiCfWt59RTyoT-tB_noQg8KZPrPmU&usqp=CAU"
            alt="product card"
          />
          <span className="product-card-stock-badge instock">IN STOCK</span>
          {/* <span className="product-card-stock-badge outofstock">
            Out Of Stock
          </span> */}
          <span className="product-card-likes-badge">0</span>
        </div>
        <div className="product-card-info">
          <h1>Twix Bar</h1>
          <p>100 CAD</p>
          {/* TODO:Discount Price */}
        </div>
        <div className="product-card-action">
          <button className="btn-box-outline">Details</button>
          <button className="btn-box-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
