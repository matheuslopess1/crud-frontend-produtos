import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const getProduct = async () => {
      try {
        const response = await api().get(`/products/${id}`);

        if (isMounted) {
          setProduct(response.data);
        }
      } catch (err) {
        console.warn({ message: err.message, detail: err });
      }
    };

    getProduct();

    return () => {
      isMounted = false;
    };
  });

  return (
    <div className="product-info">
      <h1>{product.title}</h1>
      <p>{product.description}</p>

      <p>
        URL: <a href={product.url}>{product.url}</a>
      </p>
    </div>
  );
};

export default Product;
