import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';


const App = () =>{
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/order/:oid' component={OrderScreen} /> 
          <Route path='/shipping' component={ShippingScreen} /> 
          <Route path='/payment' component={PaymentScreen} /> 
          <Route path='/placeorder' component={PlaceOrderScreen} /> 
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={SignupScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={Homescreen} exact />


        </Container>
      </main>
      <Footer/>
    </Router>
    );
}

export default App;
