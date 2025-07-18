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
import ConfirmDelete from "../../utils/ConfirmDelete/ConfirmDelete.tsx";
import { useAuth } from "../../contexts/Auth/AuthContext.tsx";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext.tsx";

const Home: React.FC = () => {
  const { currentBeat } = useAudioPlayer();

  useDocumentTitle(
    `${currentBeat ? "Now Playing • " + currentBeat?.title : "Trapeloi"}`
  );

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
    toggleDeleteCard,
    isDeleteCardOpen,
    totalPrice,
  } = useCart();

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

  const { authLoading } = useAuth();

  return (
    <>
      {!authLoading && isLoading ? (
        <div className="page-layout">
          {isDeleteCardOpen && <ConfirmDelete />}

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
            toggleDeleteCard={toggleDeleteCard}
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
