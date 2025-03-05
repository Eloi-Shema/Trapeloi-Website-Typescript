import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import IntroSection from "../../Components/IntroSection/IntroSection.tsx";
import Navbar from "../../Components/Navbar/Navbar.tsx";
import Store from "../../Components/Store/Store.tsx";
import Benefits from "../../Components/Benefits/Benefits.tsx";
import Pricing from "../../Components/Pricing/Pricing.tsx";
import Ratings from "../../Components/Ratings/Ratings.tsx";
import Newsletter from "../../Components/Newsletter/Newsletter.tsx";
import FAQ from "../../Components/FAQ/FAQ.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import Cart from "../../Components/Cart/Cart.tsx";
import logo from "../../assets/logo-white.png";
import { motion } from "framer-motion";

interface BeatType {
  id: string;
  name: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  //LOAD THE PAGE
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      SetIsLoading(true);
    }, 3000);
  }, []);

  //SAVE THE CURRENT DISPLAY STATE OF CART BOX AND ADDED/REMOVED CART ITEMS

  const [isCartVisible, setIsCartVisible] = useState<boolean>(() => {
    const saveCartDisplay = localStorage.getItem("isCartVisible");
    return saveCartDisplay === "true";
  });

  useEffect(() => {
    localStorage.setItem("isCartVisible", JSON.stringify(isCartVisible));
  }, [isCartVisible]);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const [cart, setCart] = useState<BeatType[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //ADDING ITEMS TO CARTSET THE WARNING MESSAGE WHEN THE SAME ITEM IS ADDED IN CART

  const [warning, setWarning] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = (beat: BeatType) => {
    setCart((prevCart) => {
      const isAdded = prevCart.some((item) => item.id === beat.id);
      if (isAdded) {
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }

        setWarning(`${beat.name} is already added in the Cart!`);
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);

        timeOutRef.current = setTimeout(() => {
          setWarning("");
        }, 3000);
        return prevCart;
      } else {
        setWarning("");
        return [...prevCart, beat];
      }
    });
  };

  //REMOVE/DELETE THE ITEMS FROM THE CART

  const removeFromCart = (beatId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== beatId));
  };
  const clearCart = () => {
    setCart([]);
  };

  //CALCULATING THE PRICE OF ADDED ITEMS
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
          <Navbar
            toggleCart={toggleCart}
            cartCount={cart.length}
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
            clearCart={clearCart}
            cartCount={cart.length}
            totalPrice={totalPrice}
          />
          <Benefits />
          <Pricing pricingRef={pricingRef} />
          <Newsletter />
          <Ratings />
          <FAQ />
          <Footer
            scrollToStore={handleStoreScroll}
            scrollToHome={handleHomeScroll}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="dark:bg-bgBlack bg-platinum flex flex-col items-center justify-center h-screen"
        >
          <img
            className="dark:invert-0 invert xs:w-36 lg:w-72 mb-5 animate-pulse"
            src={logo}
            alt=""
          />
          <div className="xs:w-[160px] lg:w-[200px] h-[2px] dark:bg-bgBlack bg-platinum rounded overflow-hidden">
            <div className="loading w-[20%] h-full dark:bg-white/90 bg-black"></div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
