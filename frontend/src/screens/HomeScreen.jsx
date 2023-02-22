import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { fetchProducts } from "../redux/products/productListSlice";
import { PRODUCT_LIST_STATUSES } from "../redux/products/productListSlice";

function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locate = useLocation();
  const { products, page, pages, status } = useSelector(
    (state) => state.productList
  );

  let keyword = locate.search;
 
 

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);


  if (status === PRODUCT_LIST_STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === PRODUCT_LIST_STATUSES.ERROR) {
    return <Message variant="danger">{PRODUCT_LIST_STATUSES.ERROR}</Message>;
  }

  return (
    <div>
      <h1>Latest Products</h1>
      <div>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        
        <Paginate page={page} pages={pages} keyword={keyword} />
      </div>
    </div>
  );
}

export default HomeScreen;
