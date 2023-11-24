import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useAuthContext } from "../../hooks/useAuthContext";
function Blog() {
  const [blogData, setBlogData] = useState("");
  const { user } = useAuthContext();
  const { blogId } = useParams();
  console.log("🚀 ~ file: Blog.jsx:7 ~ Blog ~ blogId:", blogId);

  useLayoutEffect(() => {
    const fetchBlog = async () => {
      if (!user) {
        console.log("User not logged in");
        return;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (json.success) {
          setBlogData(json.data);
        } else {
          console.log(json.error);
        }
      }
    };
    fetchBlog();
  }, [user, blogId]);
  if (!blogData) {
    return;
  }
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
        <div className="blog-image-cont">
          <img
            src={blogData.imageUrl}
            alt="Blog"
            className="blog-image"
            loading="eager"
          />
        </div>
        <p className="blog-content">{blogData.content}</p>
      </div>
    </div>
  );
}

export default Blog;
