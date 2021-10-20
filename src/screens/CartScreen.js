import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { getUserId } from '../redux/actions/usersActions';

function CartScreen() {
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [realWishlistProducts, setRealWishlistProducts] = useState([])


    //check if user is logged in. getting  userLogin state. getting user state from redux
    const usersReducer = useSelector((state) => state.usersReducer);
    const { currentUser, userId } = usersReducer;

    const history = useHistory();

    const getWishlistProducts = async () => {
        const response = await axios.get(`/api/Wishlists/user/${usersReducer.userId}`);
        console.log(JSON.stringify(response.data));

        const array = [];

        response.data.map((element, index) => {
            {
                products.map((element1, index1) => {
                    if (element1.id == element.productId) {
                        const obj = {
                            "id": element1.id,
                            "brandId": element1.brandId,
                            "userId": element1.userId,
                            "categoryId": element1.categoryId,
                            "productName": element1.productName,
                            "modelYear": element1.modelYear,
                            "price": element1.price,
                            "countInStock": element1.countInStock,
                            "description": element1.description,
                            "color": element1.color,
                            "country": element1.country,
                            "city": element1.city,
                            "addDate": element1.addDate,
                            "expireDate": element1.expireDate,
                            "otherBrand": element1.otherBrand,
                            "imageString": element1.imageString,
                            "quantity": element.quantity
                        }
                        console.log(element1.id)
                        array.push(obj);
                    }
                })
            }
        })

        setRealWishlistProducts(array);

        setWishlist(response.data);
    }

    const removeFromCartHandler = () => {

    }

    const getProducts = async () => {
        let response = await axios.get('/api/products')
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
        dispatch(getUserId(1, () => {
            if (currentUser === null || usersReducer.userId === 0) {
                history.push('/');
            } else {
                getWishlistProducts();
            }
        }));

    }, [dispatch, history, currentUser, userId])
    return (
        <>
            {/* <h1>Kazkas</h1>
            {realWishlistProducts.map((obj,index)=>(
                <p>{obj.productName}</p>
            ))} */}
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {realWishlistProducts.length === 0 ? <h2>You cart is empty<Link to='/'>Go Back</Link></h2> : (
                        <ListGroup variant='flush'>
                            {realWishlistProducts.map(item => (//for each item in cartItems add ListGroup.Item. and we add key=item.product(id) which is id
                                <ListGroup.Item key={item.id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.imageString} alt={item.productName} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.id}`}>{item.productName}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={item.quantity}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() =>
                                                removeFromCartHandler(item.id)}>
                                                X
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({realWishlistProducts.reduce((acc, item) => acc + item.quantity, 0)})
                            items</h2>
                            ${realWishlistProducts.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

            </Row>
        </>
    )
}

export default CartScreen
