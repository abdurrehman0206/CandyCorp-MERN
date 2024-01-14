import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../Common/Spinner";
function ProductDesc() {
  const [productData, setProductData] = useState("");
  const { user } = useAuthContext();
  const { bundleId } = useParams();
  //   console.log(bundleId);
  useLayoutEffect(() => {
    const fetchProduct = async () => {
      if (!user) {
        console.log("User not logged in");
        return;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/bundles/${bundleId}`,
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
  }, [user, bundleId]);
  if (!productData) {
    return <Spinner />;
  }
  return (
    <div className="bundles-desc-wrapper">
      <div className="bundles-desc">
        <span>
          <TbFileDescription />
        </span>
        <p>{productData.description}</p>
      </div>
    </div>
  );
}

export default ProductDesc;
