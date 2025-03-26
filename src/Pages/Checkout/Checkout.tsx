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
import AltHeader2 from "../../Components/Header/AltHeader2";
import { Link } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");

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
    <div className="layout h-screen  bg-platinum dark:bg-bgBlack dark:text-white text-black font-montserrat">
      <AltHeader2 />

      <div className=" flex flex-col items-center mt-16 px-5">
        <div className="flex flex-col items-center justify-center gap-3 mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Express checkout
          </p>
          <div className="flex xs:flex-col md:flex-row items-center justify-center flex-wrap gap-3">
            <PaypalIcon />
            <div className="flex items-center justify-center gap-5">
              <GooglePayIcon />
              <ShopIcon />
            </div>
          </div>
          <p className="text-sm text-black dark:text-white opacity-50 mt-3 mb-6">
            ————————— OR —————————
          </p>
        </div>

        <div className="leading-5 mb-5">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-semibold text-xl mb-3 font-montserrat">
              Contact
            </h3>
            <Link to={"/login"}>
              <p className="text-sm text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-400 font-semibold underline cursor-pointer">
                Login
              </p>
            </Link>
          </div>
          <form className="relative flex flex-col">
            <input
              type="email"
              id="email"
              placeholder=""
              className="peer w-full bg-black/5 dark:bg-white/5 px-3 pt-5 pb-2 mb-4 text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 dark:focus:border-transparent focus:border-transparent dark:focus:border-blueGreen outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/60 transition-all duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
            >
              Email
            </label>
          </form>
          <div className="flex items-center mb-10">
            <label className="check-box flex">
              <input type="checkbox" className="hidden" />
              <span className="transition-all duration-150 ease-linear"></span>
            </label>
            <p className="xs:text-xs md:text-sm">
              Email me with news, offers, and free downloads. You can
              unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="leading-5">
          <h3 className="font-semibold text-xl mb-3 font-montserrat">
            Payment
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            All transactions are secure and encrypted.
          </p>

          <div className="bg-white/20 dark:bg-white/5">
            <div className="flex items-center justify-between px-3 py-4 bg-white/40 dark:bg-white/20 border border-gray-400 dark:border-gray-400 rounded-t-xl">
              <p className="font-medium">Credit card</p>
              <div className="flex items-center gap-1">
                <VisaIcon />
                <MastercardIcon />
                <AmexIcon />
                <DiscoverIcon />
              </div>
            </div>
            <div className="payment flex flex-col px-4 gap-2 py-5 rounded-b-xl border border-gray-400 dark:border-gray-700 ">
              <form className="relative flex flex-col">
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
                  className="peer w-full bg-black/5 dark:bg-white/5 px-3 pt-5 pb-2 mb-4 text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 dark:focus:border-transparent focus:border-transparent dark:focus:border-blueGreen outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/60 transition-all duration-300"
                />
                <label
                  htmlFor="cardNumber"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                >
                  Card number
                </label>
              </form>

              <div className="flex items-center justify-between">
                <form className="relative flex flex-col basis-[52%]">
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
                    className="peer w-full bg-black/5 dark:bg-white/5 px-3 pt-5 pb-2 mb-4 text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 dark:focus:border-transparent focus:border-transparent dark:focus:border-blueGreen outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/60 transition-all duration-300"
                  />
                  <label
                    htmlFor="date"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Expiration date (MM/YY)
                  </label>
                </form>

                <form
                  autoComplete="off"
                  className="relative flex flex-col basis-[45%]"
                >
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{3,4}"
                    maxLength={4}
                    id="code"
                    autoComplete=""
                    placeholder=""
                    className="peer w-full bg-black/5 dark:bg-white/5 px-3 pt-5 pb-2 mb-4 text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 dark:focus:border-transparent focus:border-transparent dark:focus:border-blueGreen outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/60 transition-all duration-300"
                  />
                  <label
                    htmlFor="code"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Security code
                  </label>
                </form>
              </div>

              <form className="relative flex flex-col">
                <input
                  type="text"
                  id="cardname"
                  autoComplete="name"
                  placeholder=""
                  className="peer w-full bg-black/5 dark:bg-white/5 px-3 pt-5 pb-2 mb-4 text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 dark:focus:border-transparent focus:border-transparent dark:focus:border-blueGreen outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/60 transition-all duration-300"
                />
                <label
                  htmlFor="cardname"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                >
                  Name on the card
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
