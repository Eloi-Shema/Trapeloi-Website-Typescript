import "./Checkout.css";
import {
  AmexIcon,
  DiscoverIcon,
  GooglePayIcon,
  MastercardIcon,
  PaypalIcon,
  ShopIcon,
  VisaIcon,
} from "../../utils/icons/icons";
import arrow from "../../assets/icons/arrow.svg";
import AltHeader2 from "../../Components/Header/AltHeader2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import Loading from "../../utils/Loading/Loading";

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");

  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //CART INFO
  const { cart, totalPrice } = useCart();

  //FETCH COUNTRIES

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        const countryList = data
          .map((country: any) => country.name.common)
          .sort();
        setCountries(countryList);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  //CARD INPUT LOGIC
  const cardInput = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = cardInput(e.target.value);
    setCardNumber(formattedValue);
  };

  const expiryDateInput = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = expiryDateInput(e.target.value);
    setExpiryDate(formattedValue);
  };

  return (
    <main className="layout bg-platinum dark:bg-black dark:text-white text-black font-montserrat">
      <AltHeader2 />
      {/*SMALL SIZE*/}

      <section className="md:hidden xs:flex flex-col justify-center gap-5 px-5 pt-20 pb-5 w-full h-full dark:bg-white/5 bg-white text-gray-600 dark:text-gray-400 rounded-lg">
        <div className="flex flex-col">
          <div
            onClick={toggleCollapse}
            className="flex items-center justify-between flex-wrap px-5 text-black dark:text-white font-semibold cursor-pointer"
          >
            <div className="flex items-center py-2 mr-2">
              <p>Order summary</p>
              <img
                src={arrow}
                alt="arrow"
                className={`w-5 ml-2 invert-0 dark:invert ${
                  isCollapsed ? "rotate-180" : "rotate-0"
                } transition-all duration-300`}
              />
            </div>
            <p>${totalPrice / 100}</p>
          </div>

          <div
            className={`bg-black/5  dark:bg-white/[3%] ${
              isCollapsed
                ? "max-h-0 opacity-0"
                : "max-h-[420px] opacity-100 py-5"
            } transition-all duration-500`}
          >
            <div className="order-summary max-h-60 overflow-y-auto">
              {cart.map((beat, index) => (
                <div
                  className="flex flex-col px-5 py-2 max-h-full opacity-100"
                  key={index}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={beat.image}
                        alt=""
                        className="w-12 rounded-lg"
                      />
                      <p className="font-kanit font-light truncate">
                        {beat.name}
                      </p>
                    </div>

                    <div className="font-kanit opacity-80 truncate">
                      ${beat.price / 100}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="invert dark:invert-0 opacity-20 mx-5 mt-2 px-5" />

            <div className="flex items-start justify-between gap-3 px-5 mt-5">
              <form className="relative w-full truncate">
                <input
                  type="text"
                  id="gift"
                  autoComplete="new-password"
                  placeholder=""
                  className="peer w-full bg-white/70 dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                />
                <label
                  htmlFor="gift"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                >
                  Discount code or gift card
                </label>
              </form>
              <button className="border-2 border-black/30 dark:border-white/60 dark:text-white/50 text-black/60 py-2 px-5 mt-[2px] font-kanit text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-150 ">
                Apply
              </button>
            </div>
            <div className="flex items-center justify-between text-xl dark:text-white/80 text-black/80 px-5 pt-5">
              <p className="font-kanit">Total</p>
              <p className="font-kanit">${totalPrice / 100}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full px-5 overflow-hidden z-10">
          <div className="flex flex-col items-center justify-center gap-3 mb-10">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Express checkout
            </p>
            <div className="flex xs:flex-col md:flex-row items-center justify-center flex-wrap gap-3">
              <PaypalIcon />
              <div className="flex items-center justify-center gap-3">
                <GooglePayIcon />
                <ShopIcon />
              </div>
            </div>

            <div className="w-1/2 flex items-center gap-4 mt-3">
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 opacity-50 ">
                OR
              </span>
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>

          <div className="leading-5 xs:text-base md:text-xl mb-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold font-montserrat mr-1">Contact</h3>
              <Link to={"/login"}>
                <p className="text-xs text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-400  font-semibold underline cursor-pointer">
                  Login
                </p>
              </Link>
            </div>
            <form className="relative w-full truncate">
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder=""
                className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
              />
              <label
                htmlFor="email"
                className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
              >
                Email
              </label>
            </form>
            <div className="flex items-center px-2">
              <label className="checkout-checkbox flex">
                <input type="checkbox" id="check" className="hidden" />
                <span className="transition-all duration-150 ease-linear"></span>
              </label>
              <p className="xs:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Email me with news, offers, and free downloads. You can
                unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="leading-5 xs:text-base md:text-xl mb-10">
            <h3 className="font-semibold mb-1 font-montserrat">Payment</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              All transactions are secure and encrypted.
            </p>

            <div className="bg-white/20 dark:bg-white/[2%] border border-gray-400 dark:border-gray-600 rounded-xl">
              <div className="flex items-center justify-between px-3 py-2 mb-3 bg-white dark:bg-white/10 border-b border-dashed border-gray-400 dark:border-gray-500 rounded-t-xl">
                <p className="font-medium text-sm mr-1">Credit card</p>
                <div className="flex items-center flex-wrap gap-1 truncate">
                  <VisaIcon />
                  <MastercardIcon />
                  <AmexIcon />
                  <DiscoverIcon />
                </div>
              </div>
              <div className="payment flex flex-col px-4 gap-2 py-5">
                <form className="relative w-full truncate">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    autoComplete="new-password"
                    id="cardNumber"
                    placeholder=""
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="cardNumber"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Card number
                  </label>
                </form>

                <div className="flex xs:flex-col sm:flex-row justify-between">
                  <form className="relative basis-[52%] w-full truncate">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                      maxLength={5}
                      id="date"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      autoComplete="new-password"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="date"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Exp. date (MM/YY)
                    </label>
                  </form>

                  <form
                    autoComplete="off"
                    className="relative basis-[45%] w-full truncate"
                  >
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{3,4}"
                      maxLength={4}
                      id="code"
                      autoComplete="off"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="code"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Security code
                    </label>
                  </form>
                </div>

                <form className="relative w-full truncate">
                  <input
                    type="text"
                    id="cardname"
                    autoComplete="name"
                    placeholder=""
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="cardname"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Name on the card
                  </label>
                </form>
              </div>
            </div>
          </div>

          <div className="leading-5">
            <h3 className="font-semibold text-xl mb-3 font-montserrat">
              Billing address
            </h3>

            <div className="bg-white/20 dark:bg-white/[2%]">
              <div className="payment flex flex-col px-4 gap-2 py-5 rounded-xl border border-gray-400 dark:border-gray-700">
                <form className="relative w-full truncate">
                  <select
                    id="country"
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-gray/700 dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  >
                    <option
                      value=""
                      className="bg-white dark:bg-bgBlack text-gray-600 dark:text-gray-400"
                    >
                      Choose your Country
                    </option>
                    {countries.map((country) => (
                      <option
                        value={country}
                        key={country}
                        className="bg-white dark:bg-bgBlack text-black dark:text-white"
                      >
                        {country}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="country"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Country/Region
                  </label>
                </form>

                <div className="flex xs:flex-col md:flex-row justify-between">
                  <form className="relative basis-[49%] w-full truncate">
                    <input
                      type="text"
                      id="first-name"
                      autoComplete="name"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="first-name"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      First name
                    </label>
                  </form>

                  <form
                    autoComplete="off"
                    className="relative basis-[49%] w-full truncate"
                  >
                    <input
                      type="text"
                      id="last-name"
                      autoComplete="name"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="last-name"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Last name
                    </label>
                  </form>
                </div>

                <form className="relative w-full truncate">
                  <input
                    type="text"
                    id="address"
                    autoComplete="billing address-line1"
                    placeholder=""
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Address
                  </label>
                </form>

                <div className="flex xs:flex-col md:flex-row justify-between">
                  <form className="relative basis-[58%] w-full truncate">
                    <input
                      type="text"
                      id="city"
                      autoComplete="off"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="city"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      City
                    </label>
                  </form>

                  <form
                    autoComplete="off"
                    className="relative basis-[40%] w-full truncate"
                  >
                    <input
                      type="text"
                      id="post"
                      autoComplete="postal-code"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="post"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Postal code (optional)
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center justify-self-center mt-10 mb-2">
            <button className="flex justify-center w-full py-4 bg-purple-950 dark:bg-blueGreen text-white dark:text-black font-semibold font-montserrat rounded-lg overflow-hidden">
              Complete Order
            </button>
          </div>
          <div>
            <p className="flex justify-center items-center text-sm dark:text-gray-400 text-gray-600">
              <span className="mr-1 grayscale invert dark:invert-0">
                &#x1F512;
              </span>{" "}
              Secure checkout
            </p>
          </div>

          <div className="self-center text-xs dark:text-gray-400 text- font-montserrat font-light my-3">
            Before buying, Please revise the licensing terms and refund policy{" "}
            <Link to="/terms">
              <span className="text-blue-500 hover:underline cursor-pointer">
                here
              </span>
              .
            </Link>
          </div>
        </div>
      </section>

      {/*LARGE SIZE*/}

      <section className="xs:hidden md:flex gap-10 w-full h-full text-gray-600 dark:text-gray-400 rounded-lg">
        <div className="flex flex-col w-[60%] md:px-10 xl:px-24 pt-20 pb-5 dark:bg-white/5 bg-white">
          <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-10">
            <p className="text-sm text-gray-400">Express checkout</p>
            <div className="flex xs:flex-col lg:flex-row items-center justify-center flex-wrap gap-3">
              <PaypalIcon />
              <div className="flex items-center justify-center gap-5">
                <GooglePayIcon />
                <ShopIcon />
              </div>
            </div>

            <div className="xs:w-1/2 md:w-3/4 flex items-center gap-4 mt-3">
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 opacity-50 ">
                OR
              </span>
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>

          <div className="leading-5 xs:text-base md:text-xl mb-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold font-montserrat">Contact</h3>
              <Link to={"/login"}>
                <p className="text-xs text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-400  font-semibold underline cursor-pointer">
                  Login
                </p>
              </Link>
            </div>
            <form className="relative w-full truncate">
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder=""
                className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
              />
              <label
                htmlFor="email"
                className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
              >
                Email
              </label>
            </form>
            <div className="flex items-center px-2">
              <label className="checkout-checkbox flex">
                <input type="checkbox" id="checkb" className="hidden" />
                <span className="transition-all duration-150 ease-linear"></span>
              </label>
              <p className="text-xs text-gray-600">
                Email me with news, offers, and free downloads. You can
                unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="leading-5 xs:text-base md:text-xl mb-10">
            <h3 className="font-semibold mb-1 font-montserrat">Payment</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              All transactions are secure and encrypted.
            </p>

            <div className="bg-white/20 dark:bg-white/[2%] border border-gray-400 dark:border-gray-600 rounded-xl">
              <div className="flex items-center justify-between px-3 py-2 mb-3 bg-white dark:bg-white/10 border-b border-dashed border-gray-400 dark:border-gray-500 rounded-t-xl">
                <p className="font-medium text-sm">Credit card</p>
                <div className="flex items-center gap-1">
                  <VisaIcon />
                  <MastercardIcon />
                  <AmexIcon />
                  <DiscoverIcon />
                </div>
              </div>
              <div className="payment flex flex-col px-4 gap-2 py-5">
                <form className="relative w-full truncate">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    autoComplete="new-password"
                    id="cardNumber"
                    placeholder=""
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="cardNumber"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Card number
                  </label>
                </form>

                <div className="flex xs:flex-col md:flex-row justify-between">
                  <form className="relative basis-[52%] w-full truncate">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                      maxLength={5}
                      id="date"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      autoComplete="new-password"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="date"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Expiration date (MM/YY)
                    </label>
                  </form>

                  <form
                    autoComplete="off"
                    className="relative basis-[45%] w-full truncate"
                  >
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{3,4}"
                      maxLength={4}
                      id="code"
                      autoComplete="off"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="code"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Security code
                    </label>
                  </form>
                </div>

                <form className="relative w-full truncate">
                  <input
                    type="text"
                    id="cardname"
                    autoComplete="name"
                    placeholder=""
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="cardname"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Name on the card
                  </label>
                </form>
              </div>
            </div>
          </div>

          <div className="leading-5">
            <h3 className="font-semibold text-xl mb-3 font-montserrat">
              Billing address
            </h3>

            <div className="bg-white/20 dark:bg-white/[2%]">
              <div className="payment flex flex-col px-4 gap-2 py-5 rounded-xl border border-gray-400 dark:border-gray-700">
                <form className="relative w-full truncate">
                  <select
                    id="country"
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-gray/700 dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  >
                    <option
                      value=""
                      className="bg-white dark:bg-bgBlack text-gray-600 dark:text-gray-400"
                    >
                      Choose your Country
                    </option>
                    {countries.map((country) => (
                      <option
                        value={country}
                        key={country}
                        className="bg-white dark:bg-bgBlack text-black dark:text-white"
                      >
                        {country}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="country"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Country/Region
                  </label>
                </form>

                <div className="flex xs:flex-col md:flex-row justify-between">
                  <form className="relative basis-[49%] w-full truncate">
                    <input
                      type="text"
                      id="first-name"
                      autoComplete="name"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="first-name"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      First name
                    </label>
                  </form>

                  <form
                    autoComplete="off"
                    className="relative basis-[49%] w-full truncate"
                  >
                    <input
                      type="text"
                      id="last-name"
                      autoComplete="name"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="last-name"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Last name
                    </label>
                  </form>
                </div>

                <form className="relative w-full truncate">
                  <input
                    type="text"
                    id="address"
                    autoComplete="billing address-line1"
                    placeholder=""
                    className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Address
                  </label>
                </form>

                <div className="flex xs:flex-col md:flex-row justify-between">
                  <form className="relative basis-[58%] w-full truncate">
                    <input
                      type="text"
                      id="city"
                      autoComplete="off"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="city"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      City
                    </label>
                  </form>

                  <form
                    autoComplete="off"
                    className="relative basis-[40%] w-full truncate"
                  >
                    <input
                      type="text"
                      id="post"
                      autoComplete="postal-code"
                      placeholder=""
                      className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                    />
                    <label
                      htmlFor="post"
                      className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-5  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    >
                      Postal code (optional)
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center justify-self-center mt-10 mb-2">
            <button className="flex justify-center w-full py-4 bg-purple-950 dark:bg-blueGreen text-white dark:text-black font-semibold font-montserrat rounded-lg overflow-hidden">
              Complete Order
            </button>
          </div>
          <div>
            <p className="flex justify-center items-center text-sm dark:text-gray-400 text-gray-600">
              <span className="mr-1 grayscale invert dark:invert-0">
                &#x1F512;
              </span>{" "}
              Secure checkout
            </p>
          </div>

          <div className="self-center dark:text-white/80 text-black/80 font-montserrat font-light mt-10">
            Before buying, Please revise the licensing terms and refund policy{" "}
            <Link to="/terms">
              <span className="text-blue-500 hover:underline cursor-pointer">
                here
              </span>
              .
            </Link>
          </div>
        </div>

        <div className="fixed right-0 flex flex-col w-[40%] max-w-2xl md:px-1 lg:px-5 pt-20 mt-2">
          <div className="order-summary max-h-60 overflow-y-auto">
            {cart.map((beat, index) => (
              <div
                className="flex flex-col px-5 py-2 max-h-full opacity-100"
                key={index}
              >
                <div className="flex items-center justify-between w-full truncate">
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={beat.image}
                      alt=""
                      className="md:w-12 lg:w-16 rounded-lg"
                    />
                    <p className="font-kanit font-light">{beat.name}</p>
                  </div>

                  <div className="font-kanit opacity-80">
                    ${beat.price / 100}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start justify-between gap-3 px-5 lg:mt-5 md:scale-95 lg:scale-100">
            <form className="relative w-full truncate">
              <input
                type="text"
                id="gift"
                autoComplete="off"
                placeholder=""
                className="peer w-full bg-black/[3%] dark:bg-white/[4%] px-3 pt-8  mb-4 font-montserrat text-black dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
              />
              <label
                htmlFor="gift"
                className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-[22px]  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
              >
                Discount code or gift card
              </label>
            </form>
            <button className="border-2 border-black/20 dark:border-white/40 dark:text-white/50 text-black/60 py-2 px-5 mt-[2px] font-kanit text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-150 ">
              Apply
            </button>
          </div>
          <div className="flex items-center justify-between text-lg dark:text-white/80 text-black/80 p-5 font-medium">
            <p>Total</p>
            <p>${totalPrice / 100}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
