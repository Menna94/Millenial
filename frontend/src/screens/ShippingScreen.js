import React,{useState} from 'react'
import { Form, Button, FormGroup,FormLabel, FormControl } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContiner.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {saveShippingAddress} from '../actions/cartActions.js'


const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps stp1 stp2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                {/* ADDRESS */}
                <FormGroup controlId='address' >
                    <FormLabel>Address</FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter address' 
                        value={address} 
                        required
                        onChange={(e)=> setAddress(e.target.value)}>
                    </FormControl>
                </FormGroup>

                {/* CITY */}
                <FormGroup controlId='city' >
                    <FormLabel>City</FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter City' 
                        value={city} 
                        required
                        onChange={(e)=> setCity(e.target.value)}>
                    </FormControl>
                </FormGroup>

                {/* POSTAL */}
                <FormGroup controlId='postalCode' >
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Postal Code' 
                        value={postalCode} 
                        required
                        onChange={(e)=> setPostalCode(e.target.value)}>
                    </FormControl>
                </FormGroup>

                {/* Country */}
                <FormGroup controlId='country' >
                    <FormLabel>Country</FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Country' 
                        value={country} 
                        required
                        onChange={(e)=> setCountry(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <Button type="submit" variant="primary">Continue..</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
