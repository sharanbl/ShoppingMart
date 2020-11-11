import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../Components/Product';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch();

    // Get the products from the state
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    // Since we are maintaining global state(redux) we don't need the local state
    //const [products, setProducts] = useState([]);

    // useEffect fires when the component is loaded
    useEffect(() => {
        // Firing action to get the products and throw the reducer down into the state
        dispatch(listProducts());


        // This is what we used to do before using the global state
        // const fetchProducts = async () => {
        //     const { data } = await axios.get('/api/products');
        //     setProducts(data);
        // }
        // fetchProducts();

    }, [dispatch]);
 
    return(
        <>
            <h1>Latest Products</h1>
            {loading
             ? <Loader />
              : error
               ? <Message variant="danger">{error}</Message>
                :  <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                            </Col>
                        ))}
                     </Row>}

        </>
    );
}

export default HomeScreen;