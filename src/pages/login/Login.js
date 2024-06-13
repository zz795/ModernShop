import styles from "./Login.module.css";
import React, { useState } from "react";

//auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { projectAuth } from "../../firebase/config";

//navigation when user sign up or login in to products page
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle errors
  const [error, setError] = useState(null);

  const auth = getAuth(projectAuth.app);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Current user:", userCredential.user);
      navigate("/products");
    } catch (err) {
      console.error("Error during login:", err.code, err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Enter Your Email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className={styles.button}>
          Log In
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
