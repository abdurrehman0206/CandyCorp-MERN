import React from "react";
import { SlCalender } from "react-icons/sl";
function BlogCard() {
  return (
    <div className="blog-card-container">
      <div className="blog-card">
        <img
          src="https://thumbs.dreamstime.com/z/valentines-day-candy-hearts-4014974.jpg?w=992"
          alt="Blog Post"
        />
        <div className="blog-card-info">
          <small>
            <SlCalender />
            September 23 , 2020
          </small>
          <h1>Top 10 Candies of the Month</h1>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
