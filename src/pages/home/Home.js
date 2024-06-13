import styles from "./Home.module.css";
import React from "react";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const history = useNavigate();

  const handleDirect = () => {
    history("/products");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Welcome to ModernShop</h1>
        <h2 className={styles.h2}>
          Start shopping on the latest electronic devices right now!
        </h2>
        <p className={styles.p}>100% Authenticity. Overnight Shipping.</p>
        <button onClick={handleDirect} className={styles.button}>
          Start Shopping
        </button>
      </div>

      <div className={styles.image}>
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/financing-products-og-202006?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1593544210000"
          alt="home_products"
        />
      </div>
    </div>
  );
}
