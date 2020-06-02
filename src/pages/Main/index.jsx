import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./styles.css";

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const response = await api().get("/products");

        if (isMounted) {
          setProducts(response.data.docs);
        }
      } catch (err) {
        console.warn({ message: err.message, detail: err });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  });

  return (
    <div className="product-list">
      {products.map((product) => (
        <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>
          <a href="#">Acessar</a>
        </article>
      ))}
    </div>
  );
};

export default Main;
