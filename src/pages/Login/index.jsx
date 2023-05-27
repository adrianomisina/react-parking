import React from "react";
import styles from "./Login.module.css";
import { singInWithGoogle } from "../../utils/Firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LogoParking from '../../assets/🅿️.png'

const Login = () => {
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async () => {
    await singInWithGoogle(login);
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.login__background}>
      <div className={styles.login__container}>
        <div className={styles.brand__container}>
          <p>React Parking</p>
          <img src={LogoParking} alt="Parking logo" />
        </div>

        <div className={styles.login__card}>
          <button onClick={handleLogin} className={styles.login__btn}>
            Sign in Google Accounts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
