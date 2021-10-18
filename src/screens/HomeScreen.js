import React,{useState,useEffect} from 'react';
import {Col,Row} from 'react-bootstrap';
import axios from 'axios'
import Product from '../components/header-component/Product';

function HomeScreen(){
    const [products,setProducts] = useState([]);
    const fetchData = async () => {
        let response = await axios.get('/api/products')
        setProducts(response.data);
    };
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <>
            <Row>
                {products.map((obj,index)=>(
                    <Col key={obj.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={obj}/>
                    </Col>
                ))}
            </Row>
        </>
    )
    
}

export default HomeScreen
