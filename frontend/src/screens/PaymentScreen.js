import React,{useState} from 'react'
import { Form, Button, Col, FormGroup } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContiner.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {savePaymentMethod} from '../actions/cartActions.js'


const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps stp1 stp2 stp3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
               <FormGroup>
                   <Form.Label ad='legend'> Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='PayPal' 
                            checked 
                            onChange={e=> setPaymentMethod(e.target.value)}>
                        </Form.Check>

                        {/* <Form.Check 
                            type='radio' 
                            label='Stripe' 
                            id='Stripe' 
                            name='paymentMethod' 
                            value='Stripe'
                            onChange={e=> setPaymentMethod(e.target.value)}>
                        </Form.Check> */}
                    </Col>
               </FormGroup>

                <Button type="submit" variant="primary">Continue..</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
