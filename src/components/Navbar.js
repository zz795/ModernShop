import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

//log out
import { getAuth, signOut } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuthContext();

  const logOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out: ", err.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.title}>
          ModernShop
        </Link>
        <Link to="/products" className={styles.link}>
          Products
        </Link>
      </div>
      <div className={styles.links}>
        {user && (
          <>
            <span className={`${styles.link} ${styles.username}`}>
              Hello, {user.email}
            </span>
            <button onClick={logOut}>Log Out</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className={styles.link}>
              Sign In
            </Link>
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
