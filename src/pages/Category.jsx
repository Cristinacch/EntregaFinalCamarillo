import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import LoaderComponent from "../components/LoaderComponent/LoaderComponent";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const Category = () => {
  const [productsFiltered, setProductsFiltered] = useState([]);

  const { categoryName } = useParams();
  const { data, loading } = useCollection("products");

  useEffect(() => {
    const productsFiltered = data.filter((product) => {
      return product.category === categoryName;
    });
    setProductsFiltered(productsFiltered);
  }, [data, categoryName]);

  return (
    <Container>
      {
        loading 
          ? <LoaderComponent />
          : <ItemListContainer productsData={productsFiltered} />
        
      }
    </Container>
  )
};

export default Category;
