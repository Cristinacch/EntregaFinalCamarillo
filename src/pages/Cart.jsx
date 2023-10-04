import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Form, Button } from "react-bootstrap";
import CartItem from "../components/CartItem/CartItem";
import useCreateDocument from "../hooks/useCreateDocument";
;

const Cart = () => {
    const [form, setForm] = useState({
        email: '',
        repeatEmail: ''
    });
    const [messageError, setMessageError] = useState('')

    const {
        createOrder,
        orderId,
    } = useCreateDocument()

    const { cartItems, totalPrice, handleCleanCart } = useContext(CartContext);

    const total = totalPrice();

    const handleChange = ({target}) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.email == '' && form.repeatEmail == "") {
            setMessageError('Debe ingresar emails válidos')
        }else if(form.email != form.repeatEmail) {
            setMessageError('Los emails ingresados no coinciden')
        } else {
            setMessageError('')
            const order = {
                date: new Date(),
                state: 'generado',
                items: cartItems,
                email: form.email
            }
            createOrder(order)
            handleCleanCart();
            setForm({
                email: '',
                repeatEmail: ''
            });

        }
    }

    return (
        <Container>
            <h2 className="mt-5">Carrito de compras</h2>
            <hr />
            <div>
               {
                (cartItems.length > 0 )
                    ? 
                        <>
                                {
                                    cartItems.map(item => (
                                        <CartItem key={item.id} product={item}/>))
                                }
                                <button onClick={handleCleanCart}>Vaciar carrito</button>
                            <div>
                                <hr />
                                <h4    
                                    className="d-flex justify-content-end gap-1">
                                        total: 
                                    <span>{" "} $ {total}</span>
                                </h4>
                                
                            </div>
                            <div className="w-100">
                                <h4>Informacion de Contacto</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email"  
                                            onChange={handleChange} 
                                            placeholder="name@example.com" 
                                            name="email" 
                                            value={form.email}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirmar email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            name="repeatEmail"
                                            value={form.repeatEmail}

                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        {
                                            messageError !== '' &&
                                            <span style={{
                                                color:'red'
                                            }}>{messageError}</span>   
                                        }
                                    </Form.Group>
                                    <Button  type="submit" variant="warning">Realizar medido</Button>
                                </Form>
                            </div>
                        </>
                    : <p>No hay artículos en el carrito</p>
               }
               {
                orderId && <p className="mt-3 text-center fw-bold"> Felicidades su ordern N° {orderId} se realizó con éxito</p>
               }
            </div>
        </Container>
)
}

export default Cart