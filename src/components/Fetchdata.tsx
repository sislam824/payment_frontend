import React, { useEffect, useState } from "react";
import "../components/FetchData.css";
import { useCart } from "./CartContext";

// Define the shape of a product item
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Fetchdata: React.FC = () => {
  const [maal, setMaal] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const handleClick = (item: any) => {
    addToCart(item);
  };

  const url = "https://fakestoreapi.com/products";

  const fetchdata = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Getting error while fetching data");
      }
      const data: Product[] = await res.json();
      setMaal(data);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="grid-box">
      {maal?.map((el) => (
        <div key={el.id} className="grid-child">
          <img className="img-size" src={el.image} alt={el.title} />

          <div>
            <p>{el.title}</p>
            <strong>
              <p>$ {el.price}</p>
            </strong>
            <button className="btn-cart" onClick={() => handleClick(el)}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fetchdata;
