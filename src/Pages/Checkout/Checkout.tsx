import "./Checkout.css";
import {
  GooglePayIcon,
  PaypalIcon,
  ShopIcon,
} from "../../Components/icons/icons";
import AltHeader2 from "../../Components/Header/AltHeader2";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="layout h-screen  bg-platinum dark:bg-bgBlack dark:text-white text-black font-montserrat">
      <AltHeader2 />

      <div className="flex flex-col items-center justify-center mt-16 px-5">
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
          <div className="relative flex flex-col">
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
          </div>
          <div className="flex items-center">
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

        <div>
          <h3 className="font-semibold text-xl mb-3 font-montserrat">
            Payment
          </h3>
          <p>All transactions are secure and encrypted.</p>

          <div>
            <div>
              <p>Credit card</p>
              <div>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
