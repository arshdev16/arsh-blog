import React from "react";
import styles from "../styles/Image.module.css";
import Link from "next/link";

const Image = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.Heading}>
          BrandName
        </h2>
        <p className={styles.Para}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          quo nemo, similique sed nobis perspiciatis repudiandae
        </p>
        <div>
          <button className={styles.Subscribe}>
            <Link href="/subscribe">
              <a
                style={{ textDecoration: "none", color: "rgb(255, 0, 0)" }}
              >
                Subscribe
              </a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
