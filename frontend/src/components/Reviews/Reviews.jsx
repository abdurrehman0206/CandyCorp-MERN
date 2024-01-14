import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Profile from "../../assets/profile.jpg";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Input from "../Common/Input";
import { useAuthContext } from "../../hooks/useAuthContext";
function Reviews() {
  const { user } = useAuthContext();
  const { productId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [addReview, setAddReview] = useState(false);
  const [productData, setProductData] = useState();
  useLayoutEffect(() => {
    const fetchProduct = async () => {
      if (!user) {
        console.log("User not logged in");
        return;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/products/${productId}`,
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
          setProductData(json.data);
        } else {
          console.log(json.error);
        }
      }
    };
    fetchProduct();
  }, [user, productId]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/products/${productId}/reviews`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title,
            rating,
            comment,
          }),
        }
      );
      const json = await response.json();

      if (json.success) {
        setAddReview(false);
        setProductData(json.data);
        setRating(0);
        setComment("");
        setTitle("");
      } else {
        console.error(json.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!productData) {
    return;
  }
  return (
    <div className="reviews-wrapper">
      <section className="reviews">
        {/*Add review Button*/}
        <button
          className="add-review"
          onClick={() => setAddReview((prev) => !prev)}
        >
          {addReview ? <RxCross2 /> : <IoMdAdd />}
          {addReview ? "Cancel" : "Add"}
        </button>
        {addReview && (
          <form className="review-form" onSubmit={(e) => handleSubmit(e)}>
            <h2>Share Your Thoughts!</h2>
            <Input
              label={"Title*"}
              className="review-form-input"
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <span>Your rating*</span>
              <Rating
                onClick={(rate) => setRating(rate)}
                initialValue={rating}
                className="review-form-rating"
              />
            </div>
            <div className="review-message-area-container">
              <span>Your review*</span>
              <textarea
                placeholder="Message..."
                className="review-message-area"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button className="btn-box-primary">Submit</button>
          </form>
        )}
        {/* customer review */}
        {productData.reviews.map((customer, i) => {
          return (
            <section className="customer-review" key={i}>
              <div className="customer-review-header">
                <img
                  src={customer.user.image}
                  alt="customer-profile"
                  className="customer-profile-image"
                />
                <div className="customer-review-info">
                  <div>
                    <Rating
                      className="customer-rating-stars"
                      initialValue={customer.rating}
                      readonly={true}
                    />
                    <span className="customer-review-date">
                      {new Date(customer.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="customer-name">{customer.user.fullname}</h4>
                </div>
              </div>

              <div className="customer-review-desc">
                <h4>{customer.title}</h4>
                <p>{customer.comment}</p>
              </div>
            </section>
          );
        })}

        {/* Review Form */}
      </section>
    </div>
  );
}

export default Reviews;
