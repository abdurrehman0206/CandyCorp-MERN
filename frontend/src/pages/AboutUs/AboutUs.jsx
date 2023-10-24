import React from "react";
import Logo from "../../assets/Logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
function AboutUs() {
  const aboutData = [
    {
      title: "Our Sweet Journey",
      desc: " At Candy Corp.LTD, our story is as colorful as the candies we adore. Our journey began with a simple yet irresistible idea - to share the joy of sweets with the world. From the very first day, we've been unwavering in our commitment to delivering happiness, one delectable treat at a time",
    },
    {
      title: "The Magic of Candy",
      desc: "Candy isn't just sugar and flavor; it's a magical universe filled with vibrant colors, mouthwatering tastes, and nostalgia. We're captivated by the enchanting allure of candies - from classic confections that bring back cherished memories to innovative creations that push the boundaries of imagination.",
    },
    {
      title: "An Assortment of Sweets",
      desc: "Candy Corp.LTD is your one-stop destination for an enchanting assortment of sweets that range to your heart's desire. We offer a curated selection of candies, chocolates, gummies, and more from around the world. Our passion is to bring you the most delightful and diverse collection of treats.",
    },
    {
      title: "Crafted with Love",
      desc: "Every candy we offer is a labor of love. Our team of candy enthusiasts hand-picks and curates the finest selection of sweet delights from around the world. We take pride in the quality, taste, and joy that each candy brings. When you indulge in Candy Corp.LTD sweets, you're savoring a piece of our passion.",
    },
    {
      title: "Unforgettable Experiences",
      desc: "For us, candy isn't just a product; it's an experience. It's the excitement of unwrapping a colorful package, the thrill of discovering a new flavor, and the joy of sharing smiles with family and friends. We're here to create unforgettable moments that begin with the first bite.",
    },
    {
      title: "Monthly Bundles and Deals",
      desc: "At Candy Corp.LTD, we believe that every month should bring a new reason to celebrate. That's why we offer exciting monthly bundles and deals that let you explore new flavors, discover exclusive combinations, and indulge in your favorites. Keep an eye out for our ever-changing monthly surprises.",
    },
    {
      title: "Sweet Dreams, Big Vision",
      desc: "Our vision is as grand as the sweetest dream - to be the world's go-to destination for candy connoisseurs. We're on a mission to connect people through the shared love of candy, and to make every day a little sweeter. With innovation, creativity, and a whole lot of sugar, we're making that vision a reality.",
    },
  ];
  return (
    <div className="about-us-wrapper">
      <div className="about-us">
        <div className="about-us-hero">
          <img src={Logo} alt="Candy Corp Logo" />
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {aboutData.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <h1>{item.title}</h1>
                  <p>{item.desc}</p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
