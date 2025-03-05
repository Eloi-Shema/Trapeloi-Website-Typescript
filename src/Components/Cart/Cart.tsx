import React, { useEffect, useState } from "react";
import "./Cart.css";
import arrow_icon from "../../assets/icons/up-icon.png";
import close_icon from "../../assets/icons/close-icon.png";
import debit_card from "../../assets/icons/debit-card-icon.png";
import paypal_icon from "../../assets/icons/paypal-icon.png";
import cart_icon from "../../assets/icons/cart-icon.png";

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

interface CartProps {
  isVisible: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
  isVisible,
  toggleCart,
  cartItems,
  removeFromCart,
  clearCart,
  cartCount,
  totalPrice,
}) => {
  const [isRendered, setIsRendered] = useState<boolean>(isVisible);
  const [firstRender, setFirstRendered] = useState<boolean>(isVisible);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);

      const timer = setTimeout(() => {
        setFirstRendered(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setFirstRendered(false);
    }
  }, [isVisible]);

  const handleAnimationEnd = (): void => {
    setIsRendered(false);
  };

  return (
    isRendered && (
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`cart-box fixed xs:top-0 sm:top-[65px] md:top-[67px] xs:w-[350px] sm:w-96 right-0 dark:bg-bgBlack bg-gray-200 rounded-tl-xl rounded-bl-xl z-20 transition-transform duration-500 ${
          firstRender && isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="px-5 dark:text-gray-300 text-bgBlack">
          <div className="cart-header flex justify-between items-center h-16 px-5 -mx-5 rounded-t-xl">
            <h2 className="font-semibold">Your Cart</h2>
            <img
              onClick={toggleCart}
              className="dark:invert invert-0 w-4 rotate-90 cursor-pointer"
              src={arrow_icon}
              alt=""
            />
          </div>
          <div className="flex justify-between items-center py-5 text-xs dark:text-gray-200 text-black">
            <p>{cartCount} items</p>
            <p
              onClick={() => clearCart()}
              className="hover:underline dark:text-white text-black cursor-pointer"
            >
              Remove All
            </p>
          </div>

          <div>
            <div className="added-cart relative h-[355px] overflow-y-auto overflow-x-hidden box-border pr-1">
              {cartItems.length > 0 ? (
                cartItems.map((item, id) => {
                  return (
                    <div className="beat-bg mb-3 rounded-xl p-3" key={id}>
                      <div className="flex items-center justify-between border-b border-gray-500 mb-3">
                        <div className="flex items-center mb-4">
                          <img
                            className="w-[60px] rounded-md mr-3"
                            src={item.image}
                            alt="item cover"
                          />
                          <div className="leading-6">
                            <h4 className="dark:text-white/90 text-black text-sm font-medium">
                              {item.name}
                            </h4>
                            <p className="text-[0.625rem] dark:text-gray-400 text-gray-700">
                              MP3, WAV, Trackout
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-between h-12">
                          <img
                            className="dark:invert invert-0 w-3 cursor-pointer opacity-60"
                            src={close_icon}
                            onClick={() => removeFromCart(item.id)}
                            alt="remove icon"
                          />
                          <p className="dark:text-white/90 text-gray-700 text-xs">
                            ${item.price / 100}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-white/90">
                        <h4>SubTotal</h4>
                        <p>${item.price / 100}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="absolute top-[132px] left-[96px] flex items-center justify-center text-sm text-gray-400 font-light">
                  <img
                    className="w-[1rem] dark:invert invert-0 opacity-60 -mt-[2px] mr-2"
                    src={cart_icon}
                    alt="cart icon"
                  />
                  <h4 className="dark:text-gray-300 text-black">
                    Your cart is empty
                  </h4>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 font-bold text-lg text-black dark:text-white">
            <p>Total</p>
            <p>${totalPrice / 100}</p>
          </div>
          <hr className="my-2 dark:border-gray-100 border-gray-800 opacity-50" />

          <div className="my-3">
            <div className="flex items-center text-[13px] mb-3">
              <div>
                <label className="check-box">
                  <input className="hidden" type="checkbox" />
                  <span></span>
                </label>
              </div>
              <p className="dark:text-white text-black">
                I agree to the &nbsp;
                <span className="text-blue-700 dark:text-blue-300 hover:underline cursor-pointer">
                  licence(s) and agreement(s)
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center justify-center w-[350px] mb-3 py-3 bg-perfectBlue dark:bg-dimGreen dark:text-black text-white rounded-lg cursor-pointer">
                <img
                  className="w-4 mr-3 dark:invert-0 invert"
                  src={debit_card}
                  alt="debit card"
                />
                Credit/Debit Card
              </div>

              <button className="flex items-center justify-center w-[350px] dark:bg-platinum bg-gray-300 border border-black hover:bg-dimGold/50 rounded-lg py-3">
                <img className="w-[70px]" src={paypal_icon} alt="paypal" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
