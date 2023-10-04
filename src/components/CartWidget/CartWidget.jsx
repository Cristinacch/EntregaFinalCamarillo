import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./CartWidget.module.scss";
import { useNavigate } from "react-router-dom";

const CartWidget = () => {
  const navigate = useNavigate();
  
  const { totalItems } = useContext(CartContext);

  const total = totalItems();

  return (
    <div className={styles.cartContainer} onClick={() => navigate('/cart')}>
      <FontAwesomeIcon icon={faCartShopping} />
      <strong> {total} </strong>
     
    </div>
  );
};

export default CartWidget;
