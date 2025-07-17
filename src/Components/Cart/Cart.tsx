import React, { useEffect, useState } from "react";
import "./Cart.css";
import arrow_icon from "../../assets/icons/arrow.svg";
import close_icon from "../../assets/icons/close.svg";
import cart_icon from "../../assets/icons/cart.svg";
import right_arrow from "../../assets/icons/right-arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { IBeat } from "../../services/beat.api.service";

interface CartProps {
  isVisible: boolean;
  toggleCart: () => void;
  cartItems: IBeat[];
  removeFromCart: (id: string | number) => void;
  toggleDeleteCard: () => void;
  cartCount: number;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
  isVisible,
  toggleCart,
  cartItems,
  removeFromCart,
  toggleDeleteCard,
  cartCount,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [firstRender, setFirstRendered] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);

      const timer = setTimeout(() => {
        setFirstRendered(true);
      }, 20);
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
        className={`fixed xs:top-0 sm:top-[60px] xs:w-[350px] sm:w-96 md:w-[450px] right-0 dark:bg-bgBlack bg-gray-200 rounded-tl-xl rounded-bl-xl shadow-md shadow-black/10 dark:shadow-white/10 transition-transform duration-500 z-40 ${
          firstRender && isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="px-5 dark:text-gray-300 text-bgBlack">
          <div className="flex items-center justify-between h-16 px-5 -mx-5 cart-header rounded-t-xl">
            <h2 className="font-semibold">Your Cart</h2>
            <img
              onClick={toggleCart}
              className="w-6 rotate-90 cursor-pointer dark:invert invert-0"
              src={arrow_icon}
              alt=""
            />
          </div>
          <div className="flex items-center justify-between py-4 text-xs text-black dark:text-gray-200">
            <p>{cartCount} items</p>
            {cartItems.length > 0 && (
              <p
                onClick={toggleDeleteCard}
                className="text-black cursor-pointer hover:underline dark:text-white"
              >
                Clear All
              </p>
            )}
          </div>

          <div>
            <div className="added-cart relative h-[350px] overflow-y-auto overflow-x-hidden box-border pr-1">
              {cartItems.length > 0 ? (
                cartItems.map((item, id) => {
                  return (
                    <div className="p-3 mb-3 beat-bg rounded-xl" key={id}>
                      <div className="flex items-center justify-between mb-3 border-b border-gray-500">
                        <div className="flex items-center mb-4">
                          <img
                            className="w-[60px] rounded-md mr-3"
                            src={item.coverImageUrl}
                            alt="item cover"
                          />
                          <div className="flex flex-col gap-2">
                            <h4 className="text-sm font-medium text-black dark:text-white/90">
                              {item.title}
                            </h4>
                            <p className="text-[0.625rem] dark:text-gray-400 text-gray-700">
                              MP3, WAV, Trackout
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5 -mt-4">
                          <img
                            className="w-4 cursor-pointer dark:invert invert-0 opacity-60"
                            src={close_icon}
                            onClick={() => removeFromCart(item._id)}
                            alt="remove icon"
                          />
                          <p className="text-xs text-gray-700 dark:text-white/90">
                            ${item.price / 100}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-white/90">
                        <h4>SubTotal</h4>
                        <p>${item.price / 100}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full text-sm font-light text-gray-400">
                  <img
                    className="w-[1rem] dark:invert invert-0 opacity-60 mr-1"
                    src={cart_icon}
                    alt="cart icon"
                  />
                  <h4 className="text-black dark:text-gray-300">
                    Your cart is empty
                  </h4>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 text-lg font-bold text-black dark:text-white">
            <p>Total</p>
            <p>${totalPrice / 100}</p>
          </div>
          <hr className="my-2 border-gray-800 opacity-50 dark:border-gray-100" />

          <div className="my-5">
            <div className="flex items-center ml-2 text-[13px] mb-5">
              <div>
                <label className="check-box">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) => setIsChecked(event.target.checked)}
                    className="hidden"
                  />
                  <span></span>
                </label>
              </div>
              <p className="text-gray-700 dark:text-gray-300 ">
                I agree to the &nbsp;
                <Link to={"/terms"}>
                  <span className="text-black cursor-pointer dark:text-white hover:underline">
                    license(s) terms and conditions
                  </span>
                </Link>
              </p>
            </div>

            <div className="flex transition-all group justify-self-center">
              {cartItems.length > 0 ? (
                isChecked ? (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="flex items-center justify-center xs:w-[300px] md:w-[350px] mb-3 py-[10px] bg-black dark:bg-blueGreen dark:text-black text-white text-lg  rounded-lg cursor-pointer"
                  >
                    <p>Checkout</p>
                    <img
                      src={right_arrow}
                      alt="arrow"
                      className="w-5 invert dark:invert-0 ml-[2px] group-hover:ml-2 duration-500"
                    />
                  </button>
                ) : (
                  <button className="flex items-center justify-center xs:w-[300px] md:w-[350px] mb-3 py-[10px] bg-black/70 dark:bg-blueGreen/70 dark:text-black text-white text-lg  rounded-lg cursor-default">
                    <p>Checkout</p>
                    <img
                      src={right_arrow}
                      alt="arrow"
                      className="w-5 invert dark:invert-0 ml-[2px]"
                    />
                  </button>
                )
              ) : (
                <button className="flex items-center justify-center xs:w-[300px] md:w-[350px] mb-3 py-[10px] bg-black/40 dark:bg-gray-400 dark:text-black text-white text-lg  rounded-lg cursor-default">
                  <p>Checkout</p>
                  <img
                    src={right_arrow}
                    alt="arrow"
                    className="w-5 invert dark:invert-0 ml-[2px]"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
