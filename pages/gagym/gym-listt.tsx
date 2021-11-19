import React from "react";
import Image from "next/image";
import styles from "../../styles/Gymlist.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

import axios from "axios";

import Link from "next/link";

const GymList = () => {
  return (
    <div>
      <AppBar />

      <Footer />
    </div>
  );
};

export default GymList;
