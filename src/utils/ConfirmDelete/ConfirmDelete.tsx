import { useCart } from "../../hooks/useCart";

const ConfirmDelete: React.FC = () => {
  const { handleDeleteCard, clearCart } = useCart();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bgBlack bg-opacity-70 backdrop-blur-[2px] z-50">
      <div className="flex flex-col items-center justify-center gap-6 bg-white dark:bg-bgBlack p-6 text-black dark:text-white w-60 max-h-40 rounded-md">
        <h4 className="md:text-lg text-center font-montserrat font-bold">
          Delete cart?
        </h4>
        <div className="flex items-center gap-5 xs:text-xs md:text-sm">
          <button
            onClick={() => {
              clearCart();
              handleDeleteCard();
            }}
            className="bg-red-600 text-white font-montserrat font-semibold px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => handleDeleteCard()}
            className="bg-black/20 dark:bg-white/20 text-black dark:text-white  font-montserrat font-semibold px-4 py-2 rounded-md hover:bg-black/25 dark:hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
