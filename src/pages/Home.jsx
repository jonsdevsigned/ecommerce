import React, { useEffect, useState } from 'react';
import { filterTitleThunk, getProductsThunk, filterCategoryThunk } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const [categories, setCategories] = useState([])

    const products = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/`)
            .then(res => setCategories(res.data.data.categories))
    }, [])

    return (
        <div>
            <ListGroup horizontal className='category' as='ul'>
                {
                    categories.map((category) => (
                        <ListGroup.Item as='li' key={category.id} onClick={() => dispatch(filterCategoryThunk(category.id))}>
                            {category.name}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>

            <form>
                <InputGroup className="mb-3" size='sm' style={{width:'95vw', margin:'10px 14px'}}>
                    <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button type='submit'variant="primary" onClick={() => dispatch(filterTitleThunk(searchValue))}>
                        search
                    </Button>
                </InputGroup>
            </form>


            <Row style={{padding:'0 25px'}} xs={1} md={3} xl={4} className="g-4">
                {
                    products.map((productsItem) => (
                        <Col key={productsItem.id} >
                            <Card className='cardProducts' border='primary' onClick={() => navigate(`/product/${productsItem.id}`)} style={{width:'100%'}}>
                                <Card.Img variant="top" src={productsItem.productImgs} style={{width:'200px'}}/>
                                <Card.Body>
                                    <Card.Title className='text-primary'><h4>{productsItem.title}</h4></Card.Title>
                                    <Card.Text>{productsItem.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default Home;