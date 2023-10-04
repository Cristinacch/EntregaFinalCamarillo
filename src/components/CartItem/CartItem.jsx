import { Card, Image} from "react-bootstrap";
import styles from "./CartItem.module.scss";


const CartItem = ({
    product
}) => {

    const {
        thumbnail,
        title,
        description,
        price,
        quantity
    } = product;
    
    return (
        <Card className={styles.cartItem}>
            <Image src={thumbnail} className={styles.image}/>
            <div className={styles.details}>
                
                <h6>{title} </h6>
                <p className="block">
                    {description}
                </p>
                <h4>$ {price}</h4>
                <strong>{quantity} unidades</strong>
            </div>
        </Card>
    )
}

export default CartItem