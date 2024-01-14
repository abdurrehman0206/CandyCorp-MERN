import React, { useLayoutEffect, useState } from "react";
import { Grid } from "../imports";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import Spinner from "../Common/Spinner";

function BundleProducts() {
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
  console.log("🚀 ~ BundleProducts ~ productData:", productData);

  return (
    <>
      <div className="bundle-products-wrapper">
        <section className="products-view-wrapper">
          <Grid
            card={true}
            products={
              productData && productData?.products.length > 0
                ? productData?.products.map((p) => ({
                    ...p.product, // Keep the existing properties of the product
                    inBundleQuan: p.quantity, // Add the new property inBundleQuan
                  }))
                : null
            }
            seeMore={false}
            className={"products-view"}
          />
        </section>
      </div>
    </>
  );
}

export default BundleProducts;
