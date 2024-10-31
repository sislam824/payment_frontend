import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the cart item
interface CartItem {
  id: string; // Assuming the item has an id, adjust as necessary
  title: string;
  price: number;
  quantity?: number; // Optional quantity field, as it will be added later
}

// Define the shape of the context value
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  count: number;
  totalPrice: number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateTotalPrice: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const [count, setCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(
    JSON.parse(localStorage.getItem("totalPrice") || "0")
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems, totalPrice]);

  const addToCart = (item: CartItem) => {
    const newItem: CartItem = { ...item, quantity: 1 };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setCount((prevCount) => prevCount + 1);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + newItem.price);
  };

  const updateTotalPrice = () => {
    const newTotalPrice = cartItems.reduce(
      (acc, currentItem) =>
        acc + currentItem.price * (currentItem.quantity || 1),
      0
    );
    setTotalPrice(newTotalPrice);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        count,
        totalPrice,
        setCartItems,
        updateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
