import React, { useEffect, useState } from "react";
import "./Cart.css";
import arrow_icon from "../../assets/icons/up-icon.png";
import close_icon from "../../assets/icons/close-icon.png";
import debit_card from "../../assets/icons/debit-card-icon.png";
import paypal_icon from "../../assets/icons/paypal-icon.png";
import cart_icon from "../../assets/icons/cart-icon.png";

const Cart = ({
  isVisible,
  toggleCart,
  cartItems,
  removeFromCart,
  clearCart,
  cartCount,
  totalPrice,
}) => {
  const [isRendered, setIsRendered] = useState(isVisible);
  const [firstRender, setFirstRendered] = useState(isVisible);

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
  }),
    [isVisible];

  const handleAnimationEnd = () => {
    setIsRendered(false);
  };

  return (
    isRendered && (
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`cart-box fixed xs:top-0 sm:top-[60px] md:top-0 xs:w-[350px] sm:w-96 right-0 bg-bgBlack rounded-t-xl z-10
                       transition-transform duration-500 ${
                         firstRender && isVisible
                           ? "translate-x-0"
                           : "translate-x-full"
                       }`}
        style={{ willChange: "transform" }}
      >
        <div className="px-5 text-gray-300">
          <div className="cart-header flex justify-between items-center h-16 px-5 -mx-5 rounded-t-xl">
            <h2 className="font-semibold">Your Cart</h2>
            <img
              onClick={toggleCart}
              className="invert w-4 rotate-90 cursor-pointer"
              src={arrow_icon}
              alt=""
            />
          </div>
          <div className="flex justify-between items-center py-5 text-xs text-gray-200 font-light">
            <p>{cartCount} items</p>
            <p
              onClick={() => clearCart()}
              className="hover:underline text-white cursor-pointer"
            >
              Remove All
            </p>
          </div>

          <div>
            <div className="added-cart relative h-96 overflow-y-auto overflow-x-hidden box-border pr-1">
              {cartItems.length > 0 ? (
                cartItems.map((item, id) => {
                  return (
                    <div className="beat-bg mb-3 rounded-xl p-3" key={id}>
                      <div className="flex items-center justify-between border-b border-white/30 mb-3">
                        <div className="flex items-center mb-4">
                          <img
                            className="w-[60px] rounded-md mr-3"
                            src={item.image}
                            alt="item cover"
                          />
                          <div className="leading-6">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-[0.625rem] text-gray-400">
                              MP3, WAV, Trackout
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-between h-12">
                          <img
                            className="invert w-3 cursor-pointer opacity-60"
                            src={close_icon}
                            onClick={() => removeFromCart(item.id)}
                          />
                          <p className="text-xs">${item.price / 100}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold">
                        <h4>SubTotal</h4>
                        <p>${item.price / 100}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="absolute top-[132px] left-[96px] flex items-center justify-center text-sm text-gray-400 font-light">
                  <img
                    className="w-[1rem] invert opacity-60 -mt-[2px] mr-2"
                    src={cart_icon}
                  />
                  <h4>Your cart is empty</h4>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 font-bold text-lg text-white">
            <p>Total</p>
            <p>${totalPrice / 100}</p>
          </div>
          <hr className="my-2 opacity-50" />

          <div className="my-4">
            <div className="flex items-center text-[13px] mb-4">
              <div>
                <label className="check-box">
                  <input className="hidden" type="checkbox" />
                  <span></span>
                </label>
              </div>
              <p>
                I agree to the{" "}
                <span className="text-blue-300 hover:underline cursor-pointer">
                  licence(s) and agreement(s)
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center justify-center w-[350px] mb-4 py-2 bg-dimGreen text-black rounded-lg cursor-pointer">
                <img className="w-4 mr-3" src={debit_card} alt="" />
                Credit/Debit Card
              </div>

              <button className="flex items-center justify-center w-[350px] bg-dimGold rounded-lg py-3">
                <img className="w-[70px]" src={paypal_icon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
