import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import IntroSection from "../../Components/IntroSection/IntroSection.tsx";
import Header from "../../Components/Header/Header.tsx";
import Store from "../../Components/Store/Store.tsx";
import Benefits from "../../Components/Benefits/Benefits.tsx";
import Pricing from "../../Components/Pricing/Pricing.tsx";
import Ratings from "../../Components/Ratings/Ratings.tsx";
import FAQ from "../../Components/FAQ/FAQ.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import Cart from "../../Components/Cart/Cart.tsx";
import { useCart } from "../../hooks/useCart.ts";
import Loading from "../../utils/Loading/Loading.tsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.ts";

const Home: React.FC = () => {
  useDocumentTitle("Trapeloi");

  //LOAD THE PAGE
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      SetIsLoading(true);
    }, 1500);
  }, []);

  //USE CART INFO FROM CONTEXT, FOR EASE USE ACROSS PAGES
  const {
    isVisible: isCartVisible,
    toggleCart,
    cart,
    addToCart,
    cartNotification,
    warning,
    animate,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const handleDeleteCard = () => {
    setIsDeleteCardOpen(true);
  };

  //HANDLING SCROLLS TO HOME AND STORE ON BUTTON CLICKS THROUGHOUT THE HOMEPAGE
  const storeRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const handleStoreScroll = () => {
    if (storeRef.current) {
      storeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleHomeScroll = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePricingScroll = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="page-layout">
          {isDeleteCardOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-bgBlack bg-opacity-70 backdrop-blur-[2px] z-50">
              <div className="flex flex-col items-center justify-center gap-6 bg-white dark:bg-bgBlack p-6 text-black dark:text-white w-60 max-h-40 rounded-md">
                <h4 className="md:text-lg font-montserrat font-bold">
                  Confirm Delete?
                </h4>
                <div className="flex items-center gap-5 xs:text-xs md:text-sm">
                  <button
                    onClick={() => {
                      clearCart();
                      setIsDeleteCardOpen(false);
                    }}
                    className="bg-red-600 text-white font-montserrat font-semibold px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsDeleteCardOpen(false)}
                    className="bg-black/20 dark:bg-white/20 text-black dark:text-white  font-montserrat font-semibold px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <Header
            toggleCart={toggleCart}
            cartCount={cart.length}
            cartNotification={cartNotification}
            warning={warning}
            animate={animate}
            scrollToStore={handleStoreScroll}
            scrollToPricing={handlePricingScroll}
          />
          <IntroSection scrollToStore={handleStoreScroll} homeRef={homeRef} />
          <Store addToCart={addToCart} ref={storeRef} />
          <Cart
            isVisible={isCartVisible}
            toggleCart={toggleCart}
            cartItems={cart}
            removeFromCart={removeFromCart}
            handleDeleteCard={handleDeleteCard}
            cartCount={cart.length}
            totalPrice={totalPrice}
          />
          <Benefits />
          <Pricing pricingRef={pricingRef} />
          <Ratings />
          <FAQ />
          {/* <Newsletter /> */}
          <Footer
            scrollToStore={handleStoreScroll}
            scrollToHome={handleHomeScroll}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
