"use client"; // Ensure the component runs on the client side

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useContext, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { ProductContext } from "./provider/ProductContext";
import NotFound from "./animData/noReviews.json";
import { RiHeartLine, RiHeartFill, RiStarLine, RiStarFill, RiStarHalfFill } from "react-icons/ri";
import Skeleton from "./components/skeleton";
import { UserContext } from "./provider/UserContext";
import { Toaster, toast } from "react-hot-toast";
import Lottie from "lottie-react";
import ProductCard from "./components/ProductCard";
import { motion, useInView } from "framer-motion"; // Import framer-motion and useInView

const Page = () => {
  const { products, filteredProducts, loading, fetchProducts } = useContext(ProductContext);
  const [visibleNewArrivals, setVisibleNewArrivals] = useState(12);
  const [visibleTopRated, setVisibleTopRated] = useState(12);
  const [visibleFeatured, setVisibleFeatured] = useState(12);
  const { data: session } = useSession();
  const { user, fetchUserData } = useContext(UserContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const newArrivals = useMemo(() => {
    const now = new Date();
    return products.filter((product) => {
      const productDate = new Date(product.createdAt);
      const diffInHours = (now - productDate) / (1000 * 60 * 60);
      return diffInHours <= 24;
    });
  }, [products]);

  const topRatedProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.reviews || product.reviews.length === 0) return false;
      const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / product.reviews.length;
      return averageRating >= 3.5;
    });
  }, [products]);

  const featuredProducts = useMemo(() => products, [products]);

  const toggleWishlist = async (productId) => {
    console.log(productId)
    if (!session?.user?.id) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    const loadingToastId = toast.loading("Updating wishlist...");

    try {
      const response = await fetch("/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          productId,
        }),
      });

      if (response.ok) {
        fetchUserData();
        toast.success("Wishlist updated successfully!", { id: loadingToastId });
      } else {
        toast.error("Failed to update wishlist.", { id: loadingToastId });
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      toast.error("Something went wrong while managing your wishlist.", {
        id: loadingToastId,
      });
    }
  };

  const applyDiscount = (productId) => {
    toast.success("Discount applied to product!");
  };

  // Define animation variants
  const animationVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-full">
      <Toaster />
      {loading ? (
        <div className="grid grid-cols-4 gap-6 p-5 phone:grid-cols-2 phone:gap-0 phone:p-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full p-5 flex flex-col gap-10 phone:p-1 ">
          {/* New Arrivals Section */}
          {newArrivals.length > 0 && (
            <motion.div
              className="flex flex-col gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }} // Trigger the animation only once
              variants={animationVariants}
            >
              <motion.div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold phone:text-xl">New Arrivals</h2>
                <hr className="w-48" />
              </motion.div>
              <div className="w-full h-full flex flex-wrap items-center justify-start gap-4 ">
                {newArrivals.slice().reverse().slice(0, visibleNewArrivals).map((product) => (
                  <ProductCard key={product._id} product={product} toggleWishlist={toggleWishlist} />
                ))}
              </div>
              {visibleNewArrivals < newArrivals.length && (
                <button
                  onClick={() => setVisibleNewArrivals(newArrivals.length)}
                  className="w-full border px-4 py-3 rounded-full"
                >
                  View More
                </button>
              )}
            </motion.div>
          )}

          {/* Top Rated Section */}
          {topRatedProducts.length > 0 && (
            <motion.div
              className="flex flex-col gap-10 phone:gap-5  w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants}
            >
              <motion.div className="flex flex-col gap-2 phone:gap-1 ">
                <h2 className="text-2xl font-semibold phone:text-xl">Top Rated Products</h2>
                <hr className="w-48" />
              </motion.div>
              <div className="w-full h-full flex flex-wrap items-center justify-start gap-4 phone:gap-0">
                {topRatedProducts.slice().reverse().slice(0, visibleTopRated).map((product) => (
                  <ProductCard key={product._id} product={product} toggleWishlist={toggleWishlist} />
                ))}
              </div>
              {visibleTopRated < topRatedProducts.length && (
                <button
                  onClick={() => setVisibleTopRated(topRatedProducts.length)}
                  className="w-full border px-4 py-3 rounded-full"
                >
                  View More
                </button>
              )}
            </motion.div>
          )}

          {/* Featured Products Section */}
          <motion.div
            className="flex flex-col gap-10 phone:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants}
          >
            <motion.div className="flex flex-col gap-2 phone:gap-1">
              <h2 className="text-2xl font-semibold phone:text-xl">Featured Products</h2>
              <hr className="w-48" />
            </motion.div>
            <div className="w-full h-full flex flex-wrap items-center justify-start gap-4 phone:gap-0">
              {featuredProducts.slice().reverse().slice(0, visibleFeatured).map((product) => (
                <ProductCard key={product._id} product={product} toggleWishlist={toggleWishlist} />
              ))}
            </div>
            {visibleFeatured < featuredProducts.length && (
              <button
                onClick={() => setVisibleFeatured(featuredProducts.length)}
                className="w-full border px-4 py-3 rounded-full"
              >
                View More
              </button>
            )}
          </motion.div>

          {/* Handle No Products Found */}
          {featuredProducts.length === 0 && newArrivals.length === 0 && topRatedProducts.length === 0 && (
            <div className="w-full flex items-center justify-center h-screen">
              <Lottie loop={true} animationData={NotFound} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;