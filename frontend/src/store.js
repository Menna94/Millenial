import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import {userLoginReducer, userSignupReducer, userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducers'
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, orderUserListReducer} from './reducers/orderReducers.js'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup : userSignupReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    orderUserList : orderUserListReducer
});
const cartItemsLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};


const initialState = {
    cart:{ 
        cartItems: cartItemsLocalStorage ,
        shippingAddress: shippingAddressStorage
    },
    userLogin: { userInfo : userInfoLocalStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
        ));


export default store;