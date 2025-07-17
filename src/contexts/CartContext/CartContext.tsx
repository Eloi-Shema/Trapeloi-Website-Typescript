import { createContext, useEffect, useRef, useState } from "react";
import { IBeat } from "../../services/beat.api.service";

interface CartContextType {
  isVisible: boolean;
  toggleCart: () => void;
  cart: IBeat[];
  cartNotification?: string | null;
  warning?: string | null;
  animate?: boolean | null;
  addToCart: (beat: IBeat) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  toggleDeleteCard: () => void;
  handleDeleteCard: () => void;
  isDeleteCardOpen: boolean;
  cartCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  //SAVE THE CURRENT DISPLAY STATE OF CART BOX AND ADDED/REMOVED CART ITEMS

  // const [isCartVisible, setIsCartVisible] = useState<boolean>(() => {
  //   const saveCartDisplay = localStorage.getItem("isCartVisible");
  //   return saveCartDisplay === "true";
  // });

  // useEffect(() => {
  //   localStorage.setItem("isCartVisible", JSON.stringify(isCartVisible));
  // }, [isCartVisible]);

  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const [cart, setCart] = useState<IBeat[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //ADDING ITEMS TO CART AND SET THE WARNING MESSAGE WHEN THE SAME ITEM IS ADDED IN CART

  const [cartNotification, setCartNotification] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = (beat: IBeat) => {
    setCart((prevCart) => {
      const isAdded = prevCart.some((item) => item._id === beat._id);
      if (isAdded) {
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }

        setCartNotification("");
        setWarning(`${beat.title} is already added in the Cart`);
        setAnimate(true);

        setTimeout(() => {
          setAnimate(false);
        }, 300);

        timeOutRef.current = setTimeout(() => {
          setWarning("");
        }, 3000);

        return prevCart;
      } else {
        setCartNotification(`${beat.title} is added successfully`);
        setWarning("");

        timeOutRef.current = setTimeout(() => {
          setCartNotification("");
        }, 3000);
        return [...prevCart, beat];
      }
    });
  };

  //REMOVE/DELETE THE ITEMS FROM THE CART

  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const toggleDeleteCard = () => {
    setIsDeleteCardOpen(true);
  };
  const handleDeleteCard = () => {
    setIsDeleteCardOpen(false);
  };

  const removeFromCart = (beatId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== beatId));
  };
  const clearCart = () => {
    setCart([]);
  };

  //CALCULATING THE PRICE OF ADDED ITEMS
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        isVisible: isCartVisible,
        toggleCart,
        cart,
        addToCart,
        cartNotification,
        warning,
        animate,
        removeFromCart,
        clearCart,
        toggleDeleteCard,
        handleDeleteCard,
        isDeleteCardOpen: isDeleteCardOpen,
        cartCount: cart.length,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
