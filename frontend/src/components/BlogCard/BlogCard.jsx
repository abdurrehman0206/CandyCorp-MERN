import React from "react";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
function BlogCard(props) {
  const nav = useNavigate();
  return (
    <div className="blog-card-container" onClick={() => nav(`${props._id}`)}>
      <div className="blog-card">
        <img src={props.imageUrl} alt={props.title} />
        <div className="blog-card-info">
          <small>
            <SlCalender />
            {new Date(props.createdAt).toDateString()}
          </small>
          <h1>{props.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
