import { Col, Row } from 'react-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Product from '../Components/Product';
import { useGetProductsQuery } from '../Slices/productsApiSlice';
// import products from '../products';
function HomeScreen() {

  const {data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>
    ) : (
    <>
    <h1>Recent Products</h1>
  <Row>
            {products.map((product)=> (
                <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                >
                    <Product
                    product={product}/>
                </Col>
            ))}
        </Row>
        </>)}
</>
  )
}

export default HomeScreen