import React from "react";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";

const Products = () => {
  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200"
          alt="MacBook Pro in Space Gray"
          className={styles.image}
        />
        <div className={styles.description}>
          <h2>14-inch MacBook Pro (Space Gray)</h2>
          <ul>
            <li>
              <p>8-Core CPU</p>
            </li>
            <li>
              <p>10-Core GPU</p>
            </li>
            <li>
              <p>8GB Unified Memory</p>
            </li>
            <li>
              <p>512GB SSD Storage</p>
            </li>
          </ul>
          <p className={styles.price}>$1599.00</p>
          <Link to="/product1" className={styles.button}>
            Details
          </Link>
        </div>
      </div>
      <div className={styles.product}>
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830269"
          alt="MacBook Pro in Silver"
          className={styles.image}
        />
        <div className={styles.description}>
          <h2>14-inch MacBook Pro (Silver)</h2>
          <ul>
            <li>
              <p>8-Core CPU</p>
            </li>
            <li>
              <p>10-Core GPU</p>
            </li>
            <li>
              <p>8GB Unified Memory</p>
            </li>
            <li>
              <p>512GB SSD Storage</p>
            </li>
          </ul>
          <p className={styles.price}>$1599.00</p>
          <Link to="/product2" className={styles.button}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
