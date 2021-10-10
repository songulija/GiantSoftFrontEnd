import React from 'react'
import { Card, Button} from 'react-bootstrap';//importing Card and Button components 
import { Link } from 'react-router-dom';//to use Link instead of a href, so it will not do reload

function Product(props) {
    return (
        <div>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/products/${props.product.id}`}>
                    <Card.Img variant="top" src={props.product.imageString} style={{ with: '280px', height: '300' }} />
                </Link>
                <Card.Body>
                    <Link to={`/products/${props.product.id}`}>
                        <Card.Title as='div'>
                            <strong>{props.product.productName}</strong>
                        </Card.Title>
                    </Link>
                    {/* <Card.Text as='div'>
                        <div className='my-3'>
                            <Rating value={props.product.rating} text={`${props.product.numReviews} reviews`} />
                        </div>
                    </Card.Text> */}
                    <Card.Text as='h3'>{props.product.price}</Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
