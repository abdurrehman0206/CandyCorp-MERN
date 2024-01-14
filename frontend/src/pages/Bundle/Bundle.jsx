import React, { useLayoutEffect, useState } from "react";
import { BundleDetail } from "../../components/imports";
// import { useBundleContext } from "../../hooks/useBundleContext";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function Bundle() {
  const [bundleData, setBundleData] = useState("");
  const { user } = useAuthContext();
  const { bundleId } = useParams();
  const [refetch, setRefetch] = useState(false);
  // console.log(bundleId);
  useLayoutEffect(() => {
    const fetchBundle = async () => {
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
          setBundleData(json.data);
        } else {
          console.log(json.error);
        }
      }
    };
    fetchBundle();
  }, [user, bundleId, refetch]);
  if (!bundleData) {
    return;
  }

  return (
    <div className="bundle-wrapper">
      <div className="bundle">
        {bundleData ? (
          <BundleDetail
            bundleName={bundleData.name}
            bundleImg={bundleData.images}
            bundlePrice={bundleData.price}
            bundleInfo={bundleData.description}
            bundleCategory={bundleData.category}
            bundleType={bundleData.type}
            bundleSize={bundleData.size}
            bundleFlavor={bundleData.flavor}
            bundleId={bundleData._id}
            bundleMaxQuantity={bundleData.quantity}
            bundleLikes={bundleData.likes}
            products={bundleData.products}
            setRefetch={setRefetch}
          />
        ) : (
          <p>No bundles available</p>
        )}
      </div>
      {/* Bundle Nested Links */}
      <section className="bundle-desc-review-container">
        <nav className="bundle-desc-review-navbar">
          <ul>
            <li>
              <NavLink
                to="bundle-products"
                className={({ isActive }) =>
                  isActive ? "bundle-navlink-active" : ""
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="bundle-description"
                className={({ isActive }) =>
                  isActive ? "bundle-navlink-active" : ""
                }
              >
                Description
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="bundle-desc-review-content">{<Outlet />}</div>
      </section>
    </div>
  );
}

export default Bundle;
