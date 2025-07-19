import React from "react";
import { useNavigate } from "react-router-dom";

import Styles from "./Navbar.module.css";

const Navbar = () => {
    const navigate = useNavigate();
    const handleNavigate = (route:string) => {
        navigate(route)
    }
  return (
    <div className={Styles.navContanier}>
      <div>Navbar</div>
      <button onClick={() => handleNavigate("/call")}>Calls</button>
    </div>
  );
};

export default Navbar;
