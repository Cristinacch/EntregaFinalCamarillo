import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "react-bootstrap/Button";

const ItemCount = ({product}) => {

  const [count, setCount] = useState(0);
  const { 
    handleAddProduct,
    handleRemoveProduct
  } = useContext(CartContext);

  const handleAddItem = () => {
    setCount(count + 1);
    handleAddProduct(product);
  }

  const handleRemoveItem = () => {
    if(count > 0) {
      handleRemoveProduct(product.id)
      setCount(count - 1);
    }
  }

  return (
    <div>
      <Button variant="danger" onClick={handleRemoveItem}>-</Button>
      <label 
        style={{ 
          margin: 10,
          fontSize: "1.5rem",
          fontWeight: "bold"
        }}
      >
        {count}
      </label>
      <Button variant = "danger" onClick={handleAddItem }>+</Button>
    </div>
  );
};

export default ItemCount;
