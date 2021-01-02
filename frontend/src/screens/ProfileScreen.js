import React,{useState,useEffect} from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {getUserDetails,updateUserProfile} from '../actions/userActions.js';
import {userListOrder} from '../actions/orderActions.js'
import { userDetailsReducer } from '../reducers/userReducers.js'


const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [msg, setMsg] = useState(null);


    const dispatch =useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo } = userLogin;

    const updateProfile = useSelector(state => state.userUpdateProfile);
    const {success } = updateProfile;

    const userOrderList = useSelector(state => state.userOrderList);
    const {loading:loadingOrders , error: errorOrders, orders } = userOrderList;

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user.name){
                dispatch(getUserDetails('profile'));
                dispatch(userListOrder())
            } else {
                setName(user.name);
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user, success]);


    const submitHandler = (e) =>{
        e.preventDefault();

        if(password !== cpassword){
            setMsg('Passwords dont match!')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
            <h1> User Profile</h1>
            {msg && <Message variant='danger'>{msg}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Updated Successfully!</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email' >
                    <FormLabel>Username</FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Your Formal Name' 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}>

                    </FormControl>
                </FormGroup> 

                <FormGroup controlId='email' >
                    <FormLabel>Email Address</FormLabel>
                    <FormControl 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}>

                    </FormControl>
                </FormGroup> 


                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <FormControl 
                        type='password' 
                        placeholder='Enter password' 
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Confirm Password</Form.Label>
                    <FormControl 
                        type='password' 
                        placeholder='Enter a matched password' 
                        value={cpassword} 
                        onChange={(e)=> setCPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>


                <Button type='submit' variant='primary'> Update </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>:(
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> Date </th>
                                <th> Total </th>
                                <th> Paid </th>
                                <th> Delivered </th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>(
                                <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substing(0,10)} </td>
                                    <td> {order.totalPrice} </td>
                                    <td> {order.isPaid ? order.paidAt.substing(0,10) : 
                                        <i className='fas fa-time' style={{color:'red'}}></i>
                                    } </td>
                                    <td> {order.isDelivered ? order.deliveredAt.substing(0,10) : 
                                        <i className='fas fa-time' style={{color:'red'}}></i>
                                    } </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'> Details </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
