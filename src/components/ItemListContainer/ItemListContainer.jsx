import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import styles from "./ItemListContainer.module.scss";

const ItemListContainer = ({ productsData }) => {

  const navigate = useNavigate();
  
  return (
    <div className={styles.productContainer}>
      {productsData.map((product) => {
        return (
          <Card style={{ width: "18rem" }} key={product.id}>
            <Card.Img  src={product.thumbnail} style={{ width: "18rem", height:"18rem" }} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button
                variant="warning"
                onClick={() => navigate(`/item/${product.id}`, {state: {product}})}
              >
                Ver detalles
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default ItemListContainer;