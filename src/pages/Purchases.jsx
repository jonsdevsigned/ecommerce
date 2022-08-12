import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div style={{paddingTop:'40px'}}>
            <h2>Purchases</h2>
            <ul >
                {purchases.map((purchase) => (
                    purchase.cart.products.map(product => (
                        <li key={product.id} style={{ width:'90vw', padding:'15px', border:'1px solid rgb(0,0,0,.2)', listStyle: 'none', display:'flex', alignItems:'center', justifyContent:'center' , paddingLeft:'30px'}}>
                            <h4 className='text-primary' >{product.title}</h4>
                            <h5 style={{paddingLeft:'60px'}}>Cant. {product.productsInCart.quantity}</h5>
                            <h5 style={{paddingLeft:'60px', color:'red'}}>$ {product.price * product.productsInCart.quantity}</h5>
                        </li>
                    ))
                ))}
            </ul>
        </div>
    );
};

export default Purchases;