import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Signup} from '../actions/userActions.js';
import FormContainer from '../components/FormContiner'


const SignupScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [msg, setMsg] = useState(null);


    const dispatch =useDispatch();

    const userSignup = useSelector(state => state.userSignup);
    const { loading, error, userInfo } = userSignup;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect]);


    const submitHandler = (e) =>{
        e.preventDefault();

        if(password !== cpassword){
            setMsg('Passwords dont match!')
        } else {
            dispatch(Signup(name,email,password))

        }
    }

    return (
        <FormContainer>
            <h1> Sign Up...</h1>
            {msg && <Message variant='danger'>{msg}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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


                    <Button type='submit' variant='primary'> Sign In </Button>

                    <Row className='py-3' >
                        <Col> Already Have an Acoount? </Col>
                        <Link to={redirect? `/register?redirect=${redirect}` : `/register`}>Log-in </Link>
                    </Row>
            </Form>
        </FormContainer>
    )
}

export default SignupScreen
