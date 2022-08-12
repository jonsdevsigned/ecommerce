import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductsThunk } from '../store/slices/products.slice'
import { InputGroup, Button, Form } from "react-bootstrap";
import { addCartThunk } from '../store/slices/cart.slice';

const ProductsDetail = () => {

    const allProducts = useSelector(state => state.products)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [ add, setAdd ] = useState('')

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const productsFind = allProducts.find(productItem => productItem.id === Number(id))
        setProductDetail(productsFind)

        const filteredProducts = allProducts.filter(productItem => productItem.category.id === productsFind.category.id)
        setSuggestedProducts(filteredProducts)
    }, [allProducts, id])

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const addCart = () => {
        alert('add to cart')
        const cart = {
            id: productDetail.id,
            quantity: add
        }
        console.log(cart)
        dispatch(addCartThunk(cart))
    }

    return (
        <div className='productDetail'>
            <h2 className='text-primary'>{productDetail.title}</h2>
            <img src={productDetail.productImgs} alt="photo product" style={{height:'400px'}}/>
            <h4>${productDetail.price}</h4>

            <InputGroup size='sm' className="mb-3" style={{width: '200px', padding:'5px'}}>
                <Button onClick={addCart} id="button-addon1">
                    Add to Cart
                </Button>
                <Form.Control
                    placeholder='cant.'
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    value={add}
                    onChange={e => setAdd(e.target.value)}
                />
            </InputGroup>
            
            {
                suggestedProducts.map(products => (
                    <li key={products.id} onClick={() => navigate(`/product/${products.id}`)} style={{listStyle:'none', borderBottom:'1px solid rgb(0, 0, 0, .1)', padding:'5px', cursor:'pointer'}}>{products.title}</li>
                ))
            }
        </div>
    );
};

export default ProductsDetail;