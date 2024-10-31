import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import "../components/Cartpage.css";
import axios from "axios";

// interface CartItem {
//   id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

const Cartpage: React.FC = () => {
  const { cartItems, totalPrice, setCartItems, updateTotalPrice } = useCart();
  const [paymentSuccess] = useState<boolean>(false);

  useEffect(() => {
    updateTotalPrice();
  }, [cartItems, updateTotalPrice]);

  const handleInc = (itemId: string) => {
    setCartItems((prevCartItems: any) =>
      prevCartItems.map((item: any) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDec = (itemId: string) => {
    setCartItems((prevCartItems: any) =>
      prevCartItems.map((item: any) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (itemId: string) => {
    setCartItems((prevCartItems: any) =>
      prevCartItems.filter((item: any) => item.id !== itemId)
    );
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "https://payment-backend-hy2h.onrender.com/checkout",
        {
          items: cartItems.map((item) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        }
      );

      if (!response.data || !response.data.url) {
        throw new Error("Failed to initiate checkout");
      }

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // const handlePaymentSuccess = () => {
  //   setCartItems([]);
  //   setPaymentSuccess(true);
  // };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Cartpage</h1>
      </div>
      {!paymentSuccess && cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No item found</p>
      ) : (
        <div className="flex-box">
          <div className="grid-box1">
            {cartItems.map((el: any) => (
              <div key={el.id} className="grid-child">
                <img className="img-size" src={el.image} alt={el.title} />
                <div>
                  <p>{el.title}</p>
                  <strong>
                    <p>$ {el.price * el.quantity}</p>
                  </strong>
                  <div className="qty">
                    <button
                      className="btn-qty"
                      onClick={() => handleInc(el.id)}
                    >
                      +
                    </button>
                    <div>{el.quantity}</div>
                    <button
                      className="btn-qty"
                      onClick={() => handleDec(el.id)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="btn-qty"
                    onClick={() => handleDelete(el.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <strong>
            <h2>{`Total Item in cart: ${cartItems.length}`}</h2>
            <div>Total Price: $ {totalPrice}</div>
          </strong>
        </div>
      )}
      {!paymentSuccess && cartItems.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            style={{ padding: "5px 10px", cursor: "pointer" }}
            onClick={handleCheckout}
          >
            Checkout to proceed
          </button>
        </div>
      )}
    </>
  );
};

export default Cartpage;
