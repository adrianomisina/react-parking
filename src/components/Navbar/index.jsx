import React from 'react';
import { auth } from "../../utils/Firebase";
import { useAuth } from "../../contexts/AuthContext";
import LogoParking from  '../../assets/🅿️.png'
import styles from './Navbar.module.css'


const Navbar = () => {

  const name = localStorage.getItem("name");
  const profilePic = localStorage.getItem("profilePic");
  const { logout } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    logout();
  };


  return (
    <nav className={styles.navbar__container}>
      <div className={styles.navbar__logo__container}>
        <p>React Parking</p>
        <img src={LogoParking} alt="logo parking" />
      </div>

      <div className={styles.nav__profile__container}>
        <div className={styles.nav__profile__container__img}>
          <img src={profilePic} alt="avatar_photo" />
        </div>

        <p>{name}</p>

        <button onClick={handleLogout} className={styles.navbar__logout__btn}>Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;
