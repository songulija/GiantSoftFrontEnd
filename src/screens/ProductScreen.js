import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

function ProductScreen(props) {
    const [product,setProduct] = useState({});
    const productId = props.match.params.id;
    const [qty,setQty] = useState(0);
    const [userData,setUserData] = useState({});

    //check if user is logged in. getting  userLogin state. getting user state from redux
    const usersReducer = useSelector((state) => state.usersReducer);
    const { currentUser } = usersReducer;

    const history = useHistory();

    // post request to /api/whishlist route. provide whishlist object needed values
    const addToCartHandler = (e) =>{
        const obj = {

        }
        history.push(`/cart/${this.props.match.params.id}?qty=${this.state.qty}`)
    }

    const addToWhishlist = async()=>{
        // if there is user logged in then
        if(currentUser){

        }
        const response = await axios.post(`/api/whishlists`,)
    }

    const getProduct = async()=>{
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
    }

    const getUser = async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser}`
            }
        }//setting authorization to our token
        const response = await axios.get(`/api/accounts`,config);
        console.log('User is:'+JSON.stringify(response.data));

    }
    useEffect(()=>{
        getUser();
        getProduct();
    },[])
    
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.imageString} alt={product.productName} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='fluid'>
                        <ListGroup.Item>
                            <h3>{product.productName}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button onClick={(e) => {addToCartHandler(e)}} className='btn-block' type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
