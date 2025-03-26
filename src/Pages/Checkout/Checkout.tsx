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
import { useEffect, useState } from "react";

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");

  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return <p>Loading...</p>;
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
    <main className="layout flex xs:flex-col md:flex-row bg-platinum dark:bg-black dark:text-white text-black font-montserrat xs:px-4 md:px-10">
      <AltHeader2 />

      <div className="flex flex-col h-full w-min-[45%] dark:bg-bgBlack/60 bg-white/60 mt-16 px-5 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-10">
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
              placeholder=""
              className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
            >
              Email
            </label>
          </form>
          <div className="flex items-center px-2">
            <label className="checkout-checkbox flex">
              <input type="checkbox" className="hidden" />
              <span className="transition-all duration-150 ease-linear"></span>
            </label>
            <p className="xs:text-xs md:text-sm text-gray-600">
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
                  className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                />
                <label
                  htmlFor="cardNumber"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                    className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="date"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                    autoComplete=""
                    placeholder=""
                    className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="code"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                  className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                />
                <label
                  htmlFor="cardname"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                  className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-gray/700 dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
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
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                    className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="first-name"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                    className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="last-name"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                  className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                />
                <label
                  htmlFor="address"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                    className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="city"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
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
                    className="peer w-full bg-black/[2%] dark:bg-white/[4%] px-3 pt-5  mb-4 text-sm text-black dark:text-white rounded-lg border-b-2 border-black/50 dark:border-white/70 outline-none focus:border-purple-600  dark:focus:border-blueGreen/80 transition-all duration-300"
                  />
                  <label
                    htmlFor="post"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                  >
                    Postal code (optional)
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center justify-self-center mt-10 mb-1">
          <button className="w-full py-4 bg-black dark:bg-platinum text-white dark:text-black font-bold font-montserrat rounded-lg overflow-hidden">
            Pay now
          </button>
        </div>
        <div>
          <p className="flex justify-center items-center text-sm dark:text-gray-400 text-gray-600">
            <span className="mr-1 grayscale">&#x1F512;</span> Secure checkout
          </p>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
