import { Link } from "react-router-dom";
import errorIcon from "../../assets/icons/error.svg";

const ErrorPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen bg-platinum dark:bg-black text-black dark:text-platinum/80 font-trap p-10  gap-5">
      <img
        src={errorIcon}
        alt="Error icon"
        className="xs: w-28 md:w-40 dark:invert invert-0 opacity-80"
      />

      <div className="flex flex-col items-center gap-5">
        <p className="xs:text-2xl md:text-3xl text-center font-trap font-medium">
          500 Internal Server Error
        </p>
        <Link to={"/"}>
          <button className="px-5 py-2 bg-black dark:bg-platinum text-white dark:text-black xs:text-sm md:text-base font-kanit rounded-lg mt-5">
            Go back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
