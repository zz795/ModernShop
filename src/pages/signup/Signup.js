import styles from "./Signup.module.css";
import React, { useState } from "react";

//auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { projectAuth } from "../../firebase/config";

//navigation when user sign up or login in to produacts page
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth(projectAuth.app);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed Up User:", userCredential.user);
      navigate("/products");
    } catch (err) {
      console.error("Error during sign up:", err.code, err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="What's your email?"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password?"
          className={styles.input}
          onChange={(p) => setPassword(p.target.value)}
          value={password}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
