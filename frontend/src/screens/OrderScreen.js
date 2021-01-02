import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {createOrder, getOrderDetails, payOrder} from '../actions/orderActions.js'
import {ORDER_PAY_RESET} from '../constants/orderConstants.js'

const OrderScreen = ({match}) => {
    const orderID = match.params.oid;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState('false');

   const orderDetails = useSelector(state=> state.orderDetails);
   const {order, loading, error } = orderDetails;

   const orderPay = useSelector(state=> state.orderPay);
   const {loading: loadingPay, success: successPay } = orderPay;

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        //calculate prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,curr) => acc + curr * curr.qty, 0));
    }
   

    useEffect(()=>{
        const addPayPalScript = async() =>{
            const {data:clientID} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
            script.async = true;
            script.onload = () =>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        } 

        if(!order || successPay){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderID))
        } else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderID, successPay, order])

    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult);
        dispatch(payOrder(orderID, paymentResult))
    }

    return loading? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
    <>
    <h1> Order {order._id} </h1>
    <Col md={8}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Name:</strong>
                    {order.user.name} 
                </p>
                <p>
                    <strong>Email:</strong>
                    <a href={`mailto:${order.user.email}`}> {order.user.email} </a>
                </p>
                <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {
                    order.isDelivered ? <Message variant='success'>Delivered at {order.deliveredAt} </Message> :
                    <Message variant='danger'>Not Delivered!</Message>
                }
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                </p>
                {
                    order.isPaid ? <Message variant='success'>Paid On {order.paidAt} </Message> :
                    <Message variant='danger'>Not Paid!</Message>
                }
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? <Message>Order is Empty! </Message> : (
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item,idx)=>{
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
                                                        <Col>${order.itemsPrice}</Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Shipping</Col>
                                                        <Col>${order.shippingPrice}</Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>TAX</Col>
                                                        <Col>${order.taxPrice}</Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Total</Col>
                                                        <Col>${order.totalPrice}</Col>
                                                    </Row>
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
            {!order.isPaid && (
                <ListGroup.Item>
                    {loadingPay && <Loader/>}
                    {!sdkReady ? <Loader/> : (
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    )}
                </ListGroup.Item>
            )}
        </ListGroup>
    </Col>
    </>
}

export default OrderScreen
