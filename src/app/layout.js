// "use client";
// import { Inter } from "next/font/google";
// import { AuthProvider } from "./Providers";
// import { Nunito } from "next/font/google";
// import "./globals.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import NextTopLoader from "nextjs-toploader";
// import { CartContextProvider } from "../../lib/CartContext";
// import Navbar from "./components/navbar";
// import Subnavbar from "./components/sub-navbar";
// import { ProductProvider } from "./provider/ProductContext";
// import { usePathname } from "next/navigation";
// const inter = Inter({ subsets: ["latin"] });
// const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
// import { CartProvider } from "./provider/CartContext";
// import Banner from "./components/Banner";
// import { UserProvider } from "./provider/UserContext";
// import FilterSection from "./components/FilterSection";

// // export const metadata = {
// //   title: "Create Next App",
// //   description: "Generated by create next app",
// // };

// export default function RootLayout({ children }) {
//   const pathname = usePathname();

//   // Define routes that should not have the layout
//   const noLayoutRoutes = ["/user/login", "/user"];

//   // Check if current route is in noLayoutRoutes
//   const isNoLayout = noLayoutRoutes.includes(pathname);

//   return (
//     <html lang="en">
//       <body className={nunito.variable}>
//         {/* Top Loader for page transitions */}
//         <NextTopLoader
//           color="#7e22ce"
//           initialPosition={0.08}
//           crawlSpeed={200}
//           height={3}
//           crawl={true}
//           showSpinner={true}
//           easing="ease"
//           speed={200}
//           shadow="0 0 10px #2299DD,0 0 5px #2299DD"
//           zIndex={1600}
//           showAtBottom={false}
//         />

//         <AuthProvider>
//           <UserProvider>
//             <ProductProvider>
//               <CartProvider>
//                 {isNoLayout ? (
//                   <>{children}</>
//                 ) : (
//                   <div className="flex flex-col w-full scrollbar-thin gap-3">
//                     {/* Navbar */}
//                     <Navbar className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200" />

//                     {/* Subnavbar*/}
//                     <Subnavbar className="bg-gray-100 shadow-md border-b py-2 px-4 phone:px-2 phone:py-1" />

//                     {/* Main Content */}
//                     <div className="w-full flex flex-col gap-5  overflow-x-hidden py-5 px-6 bg-gray-50 phone:px-2">
//                       {/* Banner Section */}
//                       <div className="flex flex-col gap-10">
//                         <Banner />
//                       </div>

//                       {/* Main Content Area */}
//                       <div className="w-full flex items-start justify-center  gap-5 desktop:gap-5 phone:flex-col">
//                         <FilterSection />
//                         <div className="w-full bg-white rounded-lg shadow-lg p-1">
//                           {children}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CartProvider>
//             </ProductProvider>
//           </UserProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import { AuthProvider } from "./Providers";
import { Nunito } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "./components/navbar";
import Subnavbar from "./components/sub-navbar";
import { ProductProvider } from "./provider/ProductContext";
import { usePathname } from "next/navigation";
import { CartProvider } from "./provider/CartContext";
import Banner from "./components/Banner";
import { UserProvider } from "./provider/UserContext";
import FilterSection from "./components/FilterSection";
import { FaFilter } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/user/login", "/user"];
  const isNoLayout = noLayoutRoutes.includes(pathname);
  const homeRoute = ["", "/"];
  const isHomePage = homeRoute.includes(pathname);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <html lang="en">
      <body className={nunito.variable}>
        <NextTopLoader
          color="#7e22ce"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
          showAtBottom={false}
        />

        <AuthProvider>
          <UserProvider>
            <ProductProvider>
              <CartProvider>
                {isNoLayout ? (
                  <>{children}</>
                ) : (
                  <div className="flex flex-col w-full scrollbar-thin gap-3 bg-white">
                    <Navbar className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200" />
                    <Subnavbar className="bg-gray-100 shadow-md border-b py-2 px-4 phone:px-2 phone:py-1" />

                    <div className="w-full flex flex-col gap-5 overflow-x-hidden py-5 px-4  phone:px-2">
                      <div className="flex flex-col gap-10">
                        <Banner />
                      </div>

                      <div
                        className={`w-full ${
                          showFilter ? "flex" : "flex-col"
                        } items-start justify-start gap-5`}
                      >
                        {isHomePage && (
                          <AnimatePresence>
                            {!showFilter && (
                              <motion.button
                                key="filter-button"
                                className="bg-[#0077b6] text-white py-4 px-4 rounded-full phone:mb-4"
                                onClick={() => setShowFilter(true)}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FaFilter />
                              </motion.button>
                            )}
                          </AnimatePresence>
                        )}

                        {isHomePage && (
                          <AnimatePresence>
                            {showFilter && (
                              <motion.div
                                key="filter-section"
                                className="w-1/6 phone:w-full flex flex-col item-end gap-2"
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -200, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <button
                                  className="bg-[#0077b6] text-white px-3 py-3 rounded-full phone:mb-4"
                                  onClick={() => setShowFilter(false)}
                                >
                                  {/* <ImCross /> */}
                                  CLOSE FILTER
                                </button>
                                <FilterSection />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}

                        <motion.div
                          className={`${showFilter ? "w-full" : "w-full"} pt-5`}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {children}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}
              </CartProvider>
            </ProductProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
