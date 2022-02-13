import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className={styles.ParentContainer}>
      <h4 className={styles.WebName}>
        <Link href="/">
          <a className={styles.anchor}>BrandName</a>
        </Link>
      </h4>
      <div className={open?styles.HamburgerContainerOpen: styles.HamburgerContainerClose}>
        <ul className={styles.NavbarList}>
          <li className={styles.NavbarText}>
            <Link href="/">
              <a className={styles.anchor}>Home</a>
            </Link>
          </li>
          <li className={styles.NavbarText}>
            <Link href="/">
              <a className={styles.anchor}>Contact</a>
            </Link>
          </li>
          <li className={styles.NavbarText}>
            <Link href="/">
              <a className={styles.anchor}>About</a>
            </Link>
          </li>
        </ul>
        <div className={styles.BtnContainer}>
          <button className={styles.Subscribe}>
            <Link href="/subscribe">
              <a style={{ textDecoration: "none", color: "rgb(255, 0, 0)" }}>
                Subscribe
              </a>
            </Link>
          </button>
        </div>
      </div>
      <i
        className={`fas fa-bars ${styles.ham}`}
        onClick={() => setOpen(!open)}
      ></i>
    </div>
  );
}

export default Header;
