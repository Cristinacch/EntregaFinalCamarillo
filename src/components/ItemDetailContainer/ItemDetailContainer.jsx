import { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ItemCount from "../ItemCount/ItemCount";
import { useLocation } from "react-router-dom";

const ItemDetailContainer = ({ productData }) => {

  const [stock, setStock] = useState(10);
  const { state: { product } } = useLocation();

  return (
    <Card style={{ width: "18rem", margin: '1rem'}}>
      <Card.Img variant="top" src={productData.thumbnail}  style={{ width: "18rem", height:"18rem" }} />
      <Card.Body>
        <Card.Title>{productData.title}</Card.Title>
        <Card.Text>{productData.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{productData.price}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <ItemCount product = { product }/>
        {stock >= 5 ? (
          <strong>Stock disponible</strong>
        ) : (
          <strong>Ultimas unidades disponibles!</strong>
        )}
      </Card.Body>
    </Card>
  );
};

export default ItemDetailContainer;
