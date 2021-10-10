import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            productId: props.match.params.id,
            qty: 0,
        }
    }

    setQuantity = (e) => {
        this.setState({
            qty: e.target.value
        })
    }

    addToCartHandler = (e) => {

    }
    async componentDidMount() {
        const response = await axios.get(`/api/products/${this.state.productId}`);
        this.setState({
            product: response.data,
        });

    }
    render() {
        return (
            <>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>
                <Row>
                    <Col md={6}>
                        <Image src={this.state.product.imageString} alt={this.state.product.productName} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='fluid'>
                            <ListGroup.Item>
                                <h3>{this.state.product.productName}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${this.state.product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${this.state.product.description}
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
                                            <strong>{this.state.product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status</Col>
                                        <Col>
                                            {this.state.product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {this.state.product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={this.state.qty} onChange={(e) => {this.setQuantity(e)}}>
                                                    {[...Array(this.state.product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button onClick={(e) => {this.addToCartHandler(e)}} className='btn-block' type='button' disabled={this.state.product.countInStock === 0}>
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
}

export default ProductScreen
