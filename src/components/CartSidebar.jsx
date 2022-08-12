import { useEffect } from "react"
import { Button, Offcanvas } from "react-bootstrap"
import { getProductsThunk } from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { buyCartThunk, getCartThunk } from "../store/slices/cart.slice";
import { useNavigate } from "react-router";

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())
        dispatch(getCartThunk())
    }, [])

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {cart.map(cart => (
                            <li key={cart.id} style={{ listStyle: 'none', borderTop: '1px solid rgb(0,0,0,.2)', borderBottom: '1px solid rgb(0,0,0,.2)', padding: '25px'}}>
                                <i className="fa-solid fa-circle-xmark" style={{color:'rgb(192, 2, 2)', fontSize:'20px'}}></i>
                                <h5 className="text-primary" onClick={() => navigate(`/product/${cart.id}`)} style={{cursor: 'pointer'}}>{cart.title}</h5>
                                <b>$ {cart.price}</b>
                                <p>Cant. <>{cart.productsInCart.quantity}</></p>
                                <b>TOTAL: ${cart.price * cart.productsInCart.quantity}</b>
                            </li>

                        ))}
                    </ul>
                    <Button onClick={() => dispatch(buyCartThunk())} variant="success">Buy</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CartSidebar