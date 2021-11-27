import React from "react";
import styles from "../../styles/Weather.module.css";
import index from "./src/index";

import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

const Select = () => {
  const router = useRouter();

  return (
    <div>
      <head>
        <title>Parcel Sandbox</title>
        {/* <meta charset="UTF-8" /> */}
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="src/Jquery.js"></script>
        <title>Weather App</title>
      </head>

      <body>
        {/* <!--------- Navbar -------> */}
        <nav className="nav">
          <h1 className={styles.logo}>Weather App</h1>
        </nav>
        <div className={styles.backgroundWeather}></div>
        {/* <!-----Target Left -----> */}
        <div className={styles.location}>
          <div className="weekIcon">
            <div
              // className="flex weekday"
              className={styles.weekDay}
            ></div>
            <img
              // className="icon"
              className={styles.icon}
            ></img>
          </div>
          <div
            // className="degree row"
            className={styles.degree}
          ></div>
          <div
            // className="cityName"
            className={styles.cityName}
          ></div>
        </div>
        {/* <!-----Target Right -----> */}
        <div className={styles.weather}>
          <div className={styles.date}></div>
          <div className={styles.timeZone}></div>
          <div className={styles.rain}></div>
          <div className={styles.clouds}></div>
          <div className={styles.wind}></div>
          <div className={styles.snow}></div>
          <div className="flex--row">
            <div
              // className="flex--row"
              className={styles.sunrise}
            ></div>
            <div
              // className="flex--row padding--left-med"
              className={styles.sunset}
            ></div>
          </div>
        </div>
        {/* <!---------City search engine--------> */}
        <form className={styles.citySearch}>
          <label
            // for="searcher"
            // className="searcher"
            className={styles.searcher}
          >
            Enter City Name
          </label>
          <input
            type="text"
            // className="city"
            className={styles.city}
          />
          <span
            // className="error"
            className={styles.error}
          ></span>
        </form>

        {/* <!--Images for the animations of the wind weather--> */}

        <img
          // className="windLeave"
          // className={styles.greenLeave}
          className={styles.windLeave}
          // src="src/assets/redLeave.png"
          width="3%"
        />

        <img
          // className="windLeave"
          // className={styles.redLeave}
          className={styles.windLeave}
          // src="src/assets/yellowLeave.png"
          width="3%"
        />

        <img
          // className="windLeave"
          // className={styles.coloredLeave}
          className={styles.windLeave}
          // src="src/assets/coloredLeave.png"
          width="5%"
        />

        <img
          // className="windLeave"
          // className={styles.dandelionSeed}
          className={styles.windLeave}
          // src="src/assets/dandelionSeed.png"
          width="3%"
        />

        {/* <!--Containers for images made in javascript--> */}

        <div className={styles.snow}></div>

        <div className={styles.cloud}></div>

        {/* <!--Scripts--> */}

        <script src="index"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      </body>
    </div>
  );
};

export default Select;
