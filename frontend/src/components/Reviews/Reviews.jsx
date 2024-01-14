import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import Profile from "../../assets/profile.jpg";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Input from "../Common/Input";

function Reviews() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [addReview, setAddReview] = useState(false);

  const customerReviews = [
    {
      customer_name: "jhon smith",
      customer_profile_image: Profile,
      customer_rating: 4,
      customer_review_date: new Date(),
      customer_review_header: "Gummies",
      customer_review_desc: "Very good customer service ",
    },
    {
      customer_name: "jhon phlip",
      customer_profile_image: Profile,
      customer_rating: 1,
      customer_review_date: new Date(),
      customer_review_header: "Gummies",
      customer_review_desc:
        "I have had a lot of different gummy bears before and these are by far the best I have ever had. They are super fresh and have lots of different flavours. I also find the bag is huge so they last a while. Very soft and just sooooo good.",
    },
    {
      customer_name: "jhon smith",
      customer_profile_image: Profile,
      customer_rating: 5,
      customer_review_date: new Date(),
      customer_review_header: "Gummies",
      customer_review_desc: "Very good customer service",
    },
    {
      customer_name: "jhon smith",
      customer_profile_image: Profile,
      customer_rating: 2,
      customer_review_date: new Date(),
      customer_review_header: "Gummies",
      customer_review_desc: "Very good customer service",
    },
  ];
  // console.log(rating, comment, title);

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
          <form className="review-form">
            <h2>Share Your Thoughts!</h2>
            <Input
              label={"Titile*"}
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
        {customerReviews.map((customer) => {
          return (
            <section className="customer-review">
              <div className="customer-review-header">
                <img
                  src={customer.customer_profile_image}
                  alt="customer-profile"
                  className="customer-profile-image"
                />
                <div className="customer-review-info">
                  <div>
                    <Rating
                      className="customer-rating-stars"
                      initialValue={customer.customer_rating}
                      readonly={true}
                    />
                    <span className="customer-review-date">
                      {customer.customer_review_date.toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="customer-name">{customer.customer_name}</h4>
                </div>
              </div>

              <div className="customer-review-desc">
                <h4>{customer.customer_review_header}</h4>
                <p>{customer.customer_review_desc}</p>
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
