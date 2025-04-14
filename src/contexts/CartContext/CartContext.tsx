import { createContext, useEffect, useRef, useState } from "react";

interface BeatType {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  isVisible: boolean;
  toggleCart: () => void;
  cart: BeatType[];
  cartNotification?: string | null;
  warning?: string | null;
  animate?: boolean | null;
  addToCart: (beat: BeatType) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
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

  const [cart, setCart] = useState<BeatType[]>(() => {
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

  const addToCart = (beat: BeatType) => {
    setCart((prevCart) => {
      const isAdded = prevCart.some((item) => item.id === beat.id);
      if (isAdded) {
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }

        setCartNotification("");
        setWarning(`${beat.name} is already added in the Cart`);
        setAnimate(true);

        setTimeout(() => {
          setAnimate(false);
        }, 300);

        timeOutRef.current = setTimeout(() => {
          setWarning("");
        }, 3000);

        return prevCart;
      } else {
        setCartNotification(`${beat.name} is added successfully`);
        setWarning("");

        timeOutRef.current = setTimeout(() => {
          setCartNotification("");
        }, 3000);
        return [...prevCart, beat];
      }
    });
  };

  //REMOVE/DELETE THE ITEMS FROM THE CART

  const removeFromCart = (beatId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== beatId));
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
        cartCount: cart.length,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
