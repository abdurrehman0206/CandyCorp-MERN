import React from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useBlogContext } from "../../hooks/useBlogContext";
function Blogs() {
  const { blogs } = useBlogContext();

  if (!blogs) {
    return;
  }
  return (
    <div className="blogs-wrapper">
      <div className="blogs">
        <div className="blogs-grid">
          {blogs.map((blog ,i) => (
            <BlogCard {...blog} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
