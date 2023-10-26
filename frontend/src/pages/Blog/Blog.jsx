import React from "react";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
function Blog() {
  const blogData = {
    title: "Sample Blog Title",
    date: "October 30, 2023",
    content:
      "Greetings fellow Halloween fiends, tis the season for another dive down the history of Halloween. This time we’re rewinding through the decades and exploring the most popular Halloween candies from each decade. We can start this deep dive as far back as we’d like, but for the sake of our candy-loving readers, we’ll begin our journey in the 80s! Before we start, we’d like to acknowledge that there is an endless selection of candies we could choose from each decade. However, we had to narrow our selection down to the most popular candies during the Halloween season from each respective decade.",
    imageUrl:
      "https://www.candywarehouse.com/cdn/shop/articles/Blog_History-of-Rock-Candy-01.jpg?v=1692305964", // Replace with your image URL
  };
  return (
    <div className="blog-wrapper">
      <div className="blog">
        <div className="blog-header">
          <Link to="/blogs" className="back-button">
            <BsFillArrowLeftCircleFill />
          </Link>
          <h1 className="blog-title">{blogData.title}</h1>
          <p className="blog-date">{blogData.date}</p>
        </div>
        <img src={blogData.imageUrl} alt="Blog" className="blog-image" />
        <p className="blog-content">{blogData.content}</p>
      </div>
    </div>
  );
}

export default Blog;
