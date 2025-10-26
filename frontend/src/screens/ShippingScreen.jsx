import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../redux/cart/cartSlice";

function ShippingScreen() {
   
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  console.log(cart)

  let taddress;
  let tcity;
  let tpcode;
  let tcountry;

  if(shippingAddress){
     taddress = shippingAddress.address
     tcity = shippingAddress.city
     tpcode = shippingAddress.postalCode
     tcountry = shippingAddress.country
  }
  else{

    taddress = ""
    tcity = ""
    tpcode = ""
    tcountry = ""

  }



  const [address, setAddress] = useState(taddress);
  const [city, setCity] = useState(tcity);
  const [postalCode, setPostalCode] = useState(tpcode);
  const [country, setCountry] = useState(tcountry);

  


  // useEffect(()=>{
  //   if(shippingAddress){
  //     setAddress(shippingAddress.address)
  //     setCity(shippingAddress.city)
  //     setPostalCode(shippingAddress.postalCode)
  //     setCountry(shippingAddress.country)
  //   }
  // },[])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="mt-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter city"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="mt-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter postal code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="mt-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
