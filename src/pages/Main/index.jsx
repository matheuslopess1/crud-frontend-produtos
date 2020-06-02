import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [infos, setInfos] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const response = await api().get(`/products?page=${page}`);

        if (isMounted) {
          const { docs, ...infos } = response.data;

          setProducts(docs);
          setInfos(infos);
        }
      } catch (err) {
        console.warn({ message: err.message, detail: err });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const prevPage = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === infos.pages) {
      return;
    }

    setPage(page + 1);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>
          <Link to={`/products/${product._id}`}>Acessar</Link>
        </article>
      ))}
      <div className="actions">
        <button disabled={page === 1} onClick={prevPage}>
          Anterior
        </button>
        <button disabled={page === infos.pages} onClick={nextPage}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Main;
