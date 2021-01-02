import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {createOrder} from '../actions/orderActions.js'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    //calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,curr) => acc + curr * curr.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

   cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

   const orderCreate = useSelector(state=> state.orderCreate);
   const {order, success, error } = orderCreate;

   useEffect(()=>{
       if(success){
           history.push(`/order/${order._id}`)
       }
       // eslint-disable-next-line
   }, [history, success])

    const placeOrderHandler = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice,
        }))
    }

    return (
        <>
            <CheckoutSteps stp1 stp2 stp3 stp4/>
            <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is Empty! </Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,idx)=>{
                                    <ListGroup.Item key={idx}>
                                        <Row>
                                            {/* PRODUCT IMAGE */}
                                            <Col md={1}>
                                                <Image src={item.img} alt={item.name} fluid rounded />
                                            </Col>

                                            {/* PRODUCT NAME */}
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>


                                            {/* PRODUCT QTY & TOTAL PRICE */}
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = {item.qty * item.price}
                                            </Col>

                                            {/* ORDER SUMMARY */}
                                            <Col md={4}>
                                                <Card>
                                                    <ListGroup>

                                                        <ListGroup.Item>
                                                            <h2> Order Summary</h2>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>Items</Col>
                                                                <Col>${cart.itemsPrice}</Col>
                                                            </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>Shipping</Col>
                                                                <Col>${cart.shippingPrice}</Col>
                                                            </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>TAX</Col>
                                                                <Col>${cart.taxPrice}</Col>
                                                            </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>Total</Col>
                                                                <Col>${cart.totalPrice}</Col>
                                                            </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            {error && <Message variant='danger'>{error}</Message>}
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Button 
                                                                type='button' 
                                                                className='btn-block' 
                                                                disabled={cart.cartItems === 0} 
                                                                onClick={placeOrderHandler}> PLACE ORDER
                                                            
                                                            </Button>
                                                        </ListGroup.Item>


                                                    </ListGroup>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            </Row>
           

        </>
    )
}

export default PlaceOrderScreen
