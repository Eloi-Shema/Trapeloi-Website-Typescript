import { Link } from "react-router-dom";
import { NotFoundBanner } from "../icons/icons";

const NotFound = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen bg-platinum dark:bg-black text-black dark:text-platinum/80 font-trap p-10  gap-10">
      <NotFoundBanner />

      <div className="flex flex-col items-center gap-5">
        <p className="xs:text-3xl md:text-5xl text-center font-trap font-medium">
          Page Not Found
        </p>
        <Link to={"/"}>
          <button className="px-5 py-3 bg-black dark:bg-platinum text-white dark:text-black xs:text-xs md:text-base rounded-lg mt-5">
            Go back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
