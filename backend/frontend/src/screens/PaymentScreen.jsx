import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../redux/cart/cartSlice'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate.push('/shipping')
    }

    
    const handleChange = (e) => {
        dispatch(savePaymentMethod(paymentMethod))
        
    }

        // const [item, setItem] = useState({ kindOfStand: "", another: "another" });

        // const { kindOfStand } = item;

        // const handleChange = e => {
        //     e.persist();
        //     console.log(e.target.value);

        //     setItem(prevState => ({
        //     ...prevState,
        //     kindOfStand: e.target.value
        //     }));
        // };

        const handleSubmit = e => {
        e.preventDefault();
        navigate('/placeorder')
        console.log(paymentMethod)
        };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            {/* <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id={paymentMethod}
                            name='paymentMethod'
                            checked
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >

                        </Form.Check>

                        
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form> */}

        <form onSubmit={handleSubmit}>
            <Form.Group as='legend' controlId="paymentMethod">
                <Form.Check
                value="Paypal"
                type="radio"
                aria-label="radio 1"
                label="Paypal or CreditCard"
                onChange={handleChange}
                checked={paymentMethod === "Paypal or CreditCard"}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </form>

            {/* <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            value='Paypal or Credit Card'
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group> */}

                {/* <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form> */}
        </FormContainer>
    )
}

export default PaymentScreen