import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen  from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <Routes> 
              <Route exact path="/" element={<HomeScreen />}></Route>
              <Route path="/Product/:id" element={<ProductScreen />}></Route>
              <Route  path="/Cart/:id?" element={<CartScreen />}></Route>
              <Route path="/Login" element= {<LoginScreen />}></Route>
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeOrder' element={<PlaceOrderScreen />} />
              <Route  path="/order/:id" element={<OrderScreen />}></Route>

              
            </Routes>
          </Container>
        </main> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;