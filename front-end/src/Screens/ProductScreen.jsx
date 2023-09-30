import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Rating from '../Components/Ratings.jsx';
import { useGetProductsDetailsQuery } from '../Slices/productsApiSlice.js';
function ProductScreen() {
    const { id: productId } = useParams();

const {data: product, isLoading, error } = useGetProductsDetailsQuery(productId)

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            { isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>): (  <Row>
                <Col md={5}>
                    <Image className='rounded' src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} 
                            text={`${product.numReviews} Reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card className='rounded'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock!' : 'Out of Stock!' }</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-dark btn-block'
                                type='button'
                                disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

            </Row>)}
          
        </>
    )
}

export default ProductScreen
    