import React from 'react';
import {Col,Row} from 'react-bootstrap';
import axios from 'axios'
import Product from '../components/header-component/Product';

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
        }
    }
    async componentDidMount(){
        const response = await axios.get('/api/products');
        this.setState({
            products: response.data,
        })
    }
    render(){
        return (
            <>
                <Row>
                    {this.state.products.map((obj,index)=>(
                        <Col key={obj.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={obj}/>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    
}

export default HomeScreen
