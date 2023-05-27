import React, { useState, useEffect } from "react";
import axios from 'axios'
import styles from './Home.module.css'
import Navbar from "../../components/Navbar";
import CarList from "../CarList";

const Home = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/cars")
      .then(response => {
      setCars(response.data)
    })
  },[])

  return (
    <div className={styles.home__container}>
      <Navbar />
      <CarList  cars={cars} setCars={setCars} />
    </div>
  );
};

export default Home;
